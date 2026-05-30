-- CollectibleSquishy.server.lua
-- Place inside any floating model or Part to make it collectible and grant coins!

local Players = game:GetService("Players")
local TweenService = game:GetService("TweenService")
local RunService = game:GetService("RunService")

local part = script.Parent
local debounce = false

-- Cache original coordinates
local originalPosition = part.Position
local originalSize = part.Size
local originalTransparency = part.Transparency

-- Parameters
local coinReward = 5
local respawnTime = 5.0 -- Wait 5 seconds to respawn
local floatAmplitude = 0.6 -- How high it bobs
local floatSpeed = 3.0 -- How fast it bobs
local rotateSpeed = 60.0 -- Rotation speed in degrees per second

-- Floating and Rotating Motion (Heartbeat loop)
local movementConnection
movementConnection = RunService.Heartbeat:Connect(function(deltaTime)
	if part.Parent == nil then
		movementConnection:Disconnect()
		return
	end
	
	-- Only bob and rotate if it's active and visible
	if part.Transparency == originalTransparency then
		-- Calculate sine-wave bobbing offset
		local bobOffset = math.sin(os.clock() * floatSpeed) * floatAmplitude
		part.Position = originalPosition + Vector3.new(0, bobOffset, 0)
		
		-- Spin the part
		part.CFrame = part.CFrame * CFrame.Angles(0, math.rad(rotateSpeed * deltaTime), 0)
	end
end)

-- Collection Event Trigger
local function onTouched(otherPart)
	if debounce then return end
	
	local character = otherPart.Parent
	local player = Players:GetPlayerFromCharacter(character)
	
	if player then
		-- Fetch player's Leaderstats data
		local leaderstats = player:FindFirstChild("leaderstats")
		local coinsVal = leaderstats and leaderstats:FindFirstChild("Coins")
		local squishiesVal = leaderstats and leaderstats:FindFirstChild("Squishies")
		
		if coinsVal and squishiesVal then
			debounce = true
			
			-- 1. Play squeak sound
			local squeakSound = part:FindFirstChild("CollectSound")
			if squeakSound then
				squeakSound:Play()
			end
			
			-- 2. Award Stats
			coinsVal.Value = coinsVal.Value + coinReward
			squishiesVal.Value = squishiesVal.Value + 1
			
			-- 3. Visual Shrink Tween Feedback
			local shrinkInfo = TweenInfo.new(0.15, Enum.EasingStyle.Back, Enum.EasingDirection.In)
			local shrinkTween = TweenService:Create(part, shrinkInfo, {
				Size = Vector3.new(0, 0, 0),
				Transparency = 1
			})
			shrinkTween:Play()
			
			task.wait(0.15)
			part.CanCollide = false
			part.CanTouch = false
			
			-- 4. Respawn Delay Cooldown
			task.wait(respawnTime)
			
			-- 5. Bouncy Pop-in Respawn Tween
			part.Size = Vector3.new(0, 0, 0)
			part.Transparency = originalTransparency
			part.Position = originalPosition
			part.CanCollide = false
			part.CanTouch = true
			
			local popInfo = TweenInfo.new(0.5, Enum.EasingStyle.Elastic, Enum.EasingDirection.Out)
			local popTween = TweenService:Create(part, popInfo, {Size = originalSize})
			popTween:Play()
			
			task.wait(0.5)
			debounce = false
		end
	end
end

part.Touched:Connect(onTouched)
