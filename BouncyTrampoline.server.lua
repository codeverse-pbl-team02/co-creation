-- BouncyTrampoline.server.lua
-- Place this inside a trampoline cylinder or block to fling players skyward!

local TweenService = game:GetService("TweenService")

local part = script.Parent
local debounce = false

-- Cache original properties
local originalSize = part.Size
local originalCFrame = part.CFrame
local originalColor = part.Color

-- Parameters
local bounceForce = 120        -- Upward launch velocity (Studs per second)
local compressionRatio = 0.20 -- Deep squash down to 20% of height
local expansionRatio = 1.40   -- Bulge X/Z to 140%
local squashDuration = 0.08   -- Launches instantly (very snappy compression)
local launchDuration = 0.6    -- Rubbery high-frequency return spring animation

-- Calculations
local squishedSize = Vector3.new(
	originalSize.X * expansionRatio,
	originalSize.Y * compressionRatio,
	originalSize.Z * expansionRatio
)
local compressDeltaY = originalSize.Y - squishedSize.Y
local squishedCFrame = originalCFrame * CFrame.new(0, -compressDeltaY / 2, 0)

-- Tweens
local squashInfo = TweenInfo.new(squashDuration, Enum.EasingStyle.Quad, Enum.EasingDirection.Out)
local restoreInfo = TweenInfo.new(launchDuration, Enum.EasingStyle.Elastic, Enum.EasingDirection.Out)

local squashTweenSize = TweenService:Create(part, squashInfo, {Size = squishedSize})
local squashTweenCFrame = TweenService:Create(part, squashInfo, {CFrame = squishedCFrame})
-- Visual: turn spring pad bright green or golden when compressed
local squashColor = TweenService:Create(part, squashInfo, {Color = Color3.fromRGB(247, 202, 75)}) 

local restoreTweenSize = TweenService:Create(part, restoreInfo, {Size = originalSize})
local restoreTweenCFrame = TweenService:Create(part, restoreInfo, {CFrame = originalCFrame})
local restoreColor = TweenService:Create(part, restoreInfo, {Color = originalColor})

-- Launch Touch Trigger
local function onTouched(otherPart)
	if debounce then return end
	
	local character = otherPart.Parent
	local humanoid = character:FindFirstChildOfClass("Humanoid")
	local rootPart = character:FindFirstChild("HumanoidRootPart")
	
	if humanoid and rootPart and humanoid.Health > 0 then
		debounce = true
		
		-- Play bounce sound if present in the Part
		local boingSound = part:FindFirstChild("BoingSound")
		if boingSound then
			boingSound:Play()
		end
		
		-- 1. Squash down pad
		squashTweenSize:Play()
		squashTweenCFrame:Play()
		squashColor:Play()
		
		-- 2. Modern Physics Impulse Launch:
		-- We set AssemblyLinearVelocity directly on the HumanoidRootPart. 
		-- This overrides downward falling momentum and instantly flings them up.
		rootPart.AssemblyLinearVelocity = Vector3.new(
			rootPart.AssemblyLinearVelocity.X * 0.5, -- Retain half horizontal speed for control
			bounceForce,                             -- Hard upward boost
			rootPart.AssemblyLinearVelocity.Z * 0.5
		)
		
		task.wait(squashDuration + 0.02)
		
		-- 3. Jiggle back with springy Elastic curve
		restoreTweenSize:Play()
		restoreTweenCFrame:Play()
		restoreColor:Play()
		
		task.wait(launchDuration * 0.4)
		debounce = false
	end
end

part.Touched:Connect(onTouched)
