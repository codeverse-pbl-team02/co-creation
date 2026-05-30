-- CharacterSquish.client.lua
-- Place this inside StarterPlayer -> StarterCharacterScripts in Roblox Studio.

local TweenService = game:GetService("TweenService")

local character = script.Parent
local humanoid = character:WaitForChild("Humanoid")

-- Cache R15 Character Scale Multipliers (if they exist)
local heightScale = humanoid:WaitForChild("BodyHeightScale", 3)
local widthScale = humanoid:WaitForChild("BodyWidthScale", 3)
local depthScale = humanoid:WaitForChild("BodyDepthScale", 3)

local debounce = false

-- Squash Animation Parameters
local squashDuration = 0.08
local recoverDuration = 0.6

local function triggerLandSquish()
	if debounce then return end
	debounce = true
	
	-- Double check that the R15 body scale values exist
	if heightScale and widthScale and depthScale then
		-- Cache original scale sizes (usually 1.0 unless customized)
		local origH = heightScale.Value
		local origW = widthScale.Value
		local origD = depthScale.Value
		
		-- Target Squash Scales (Volume-conserving deformation)
		local targetH = origH * 0.75 -- Squash down to 75% height
		local targetW = origW * 1.20 -- Expand to 120% width
		local targetD = origD * 1.20 -- Expand to 120% depth
		
		-- Setup Tween info
		local squashInfo = TweenInfo.new(squashDuration, Enum.EasingStyle.Quad, Enum.EasingDirection.Out)
		local recoverInfo = TweenInfo.new(recoverDuration, Enum.EasingStyle.Elastic, Enum.EasingDirection.Out)
		
		-- Create Squash Tweens
		local sH = TweenService:Create(heightScale, squashInfo, {Value = targetH})
		local sW = TweenService:Create(widthScale, squashInfo, {Value = targetW})
		local sD = TweenService:Create(depthScale, squashInfo, {Value = targetD})
		
		-- Create Recovery Tweens
		local rH = TweenService:Create(heightScale, recoverInfo, {Value = origH})
		local rW = TweenService:Create(widthScale, recoverInfo, {Value = origW})
		local rD = TweenService:Create(depthScale, recoverInfo, {Value = origD})
		
		-- Play Squish
		sH:Play()
		sW:Play()
		sD:Play()
		
		task.wait(squashDuration)
		
		-- Play bouncy recovery
		rH:Play()
		rW:Play()
		rD:Play()
		
		task.wait(recoverDuration)
	end
	
	debounce = false
end

-- Listen for humanoid state transitions
humanoid.StateChanged:Connect(function(oldState, newState)
	-- Landed state is triggered when the character falls/jumps and touches solid ground
	if newState == Enum.HumanoidStateType.Landed then
		triggerLandSquish()
	end
end)
