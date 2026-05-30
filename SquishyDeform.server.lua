-- SquishyDeform.server.lua
-- Place this script inside any Part in Roblox Studio to make it squish and bounce!

local TweenService = game:GetService("TweenService")

local part = script.Parent
local debounce = false

-- Cache original properties
local originalSize = part.Size
local originalCFrame = part.CFrame
local originalColor = part.Color

-- Configurable Parameters
local compressionRatio = 0.50 -- Compress Y to 50% of original
local expansionRatio = 1.25   -- Expand X and Z by 125% to conserve volume
local squashDuration = 0.15   -- How fast it flattens
local restoreDuration = 0.8   -- Elastic return jiggle speed

-- Calculate squished values
local squishedSize = Vector3.new(
	originalSize.X * expansionRatio,
	originalSize.Y * compressionRatio,
	originalSize.Z * expansionRatio
)

-- Math details: Since Roblox scales parts from their center, compressing a part 
-- will cause the top to sink and the bottom to lift up. To keep the bottom of 
-- the part anchored firmly on the ground, we shift the position down by 
-- half of the height change delta.
local compressDeltaY = originalSize.Y - squishedSize.Y
local squishedCFrame = originalCFrame * CFrame.new(0, -compressDeltaY / 2, 0)

-- Set up Tweens
local squashInfo = TweenInfo.new(
	squashDuration,
	Enum.EasingStyle.Quad,
	Enum.EasingDirection.Out
)

local restoreInfo = TweenInfo.new(
	restoreDuration,
	Enum.EasingStyle.Elastic, --rubbery jiggle
	Enum.EasingDirection.Out
)

-- Tweens objects
local squashTweenSize = TweenService:Create(part, squashInfo, {Size = squishedSize})
local squashTweenCFrame = TweenService:Create(part, squashInfo, {CFrame = squishedCFrame})
-- Optional visual fluff: change color slightly when squished (glow effect)
local squashColor = TweenService:Create(part, squashInfo, {Color = Color3.fromRGB(originalColor.R * 255 * 1.1, originalColor.G * 255 * 1.1, originalColor.B * 255 * 0.9)})

local restoreTweenSize = TweenService:Create(part, restoreInfo, {Size = originalSize})
local restoreTweenCFrame = TweenService:Create(part, restoreInfo, {CFrame = originalCFrame})
local restoreColor = TweenService:Create(part, restoreInfo, {Color = originalColor})

-- Touch Handler
local function onTouched(otherPart)
	if debounce then return end
	
	-- Check if touched by a player character
	local character = otherPart.Parent
	local humanoid = character:FindFirstChildOfClass("Humanoid")
	
	if humanoid and humanoid.Health > 0 then
		debounce = true
		
		-- 1. Play squeak sound if one is present in the part
		local squeakSound = part:FindFirstChild("SqueakSound")
		if squeakSound then
			squeakSound:Play()
		end
		
		-- 2. Trigger flattening deformation
		squashTweenSize:Play()
		squashTweenCFrame:Play()
		squashColor:Play()
		
		-- Wait until player steps off or animation completes
		task.wait(squashDuration + 0.05)
		
		-- 3. Jiggle back to original form
		restoreTweenSize:Play()
		restoreTweenCFrame:Play()
		restoreColor:Play()
		
		-- cooldown to prevent spamming
		task.wait(restoreDuration * 0.5)
		debounce = false
	end
end

part.Touched:Connect(onTouched)
