-- Leaderstats.server.lua
-- Place this script inside ServerScriptService in Roblox Studio.

local DataStoreService = game:GetService("DataStoreService")
local Players = game:GetService("Players")

-- Create or fetch our secure game DataStore
local squishyDataStore = DataStoreService:GetDataStore("SquishyGameDataStore_v1")

-- Load Data Handler
local function onPlayerAdded(player)
	-- 1. Create leaderstats folder
	local leaderstats = Instance.new("Folder")
	leaderstats.Name = "leaderstats"
	leaderstats.Parent = player
	
	-- 2. Create Coins value
	local coins = Instance.new("IntValue")
	coins.Name = "Coins"
	coins.Value = 0
	coins.Parent = leaderstats
	
	-- 3. Create Squishies collected value
	local squishies = Instance.new("IntValue")
	squishies.Name = "Squishies"
	squishies.Value = 0
	squishies.Parent = leaderstats
	
	-- 4. Secure loading from DataStore
	local playerKey = "Player_" .. player.UserId
	local success, savedData = pcall(function()
		return squishyDataStore:GetAsync(playerKey)
	end)
	
	if success and savedData then
		coins.Value = savedData.Coins or 0
		squishies.Value = savedData.Squishies or 0
		print("Loaded data for player: " .. player.Name)
	else
		if not success then
			warn("Failed to load DataStore for player: " .. player.Name)
		else
			print("No saved data found for player: " .. player.Name .. ". Creating new profile.")
		end
	end
end

-- Save Data Handler
local function savePlayerData(player)
	local leaderstats = player:FindFirstChild("leaderstats")
	if leaderstats then
		local coins = leaderstats:FindFirstChild("Coins")
		local squishies = leaderstats:FindFirstChild("Squishies")
		
		if coins and squishies then
			local playerKey = "Player_" .. player.UserId
			local dataToSave = {
				Coins = coins.Value,
				Squishies = squishies.Value
			}
			
			local tries = 3
			local success = false
			
			-- Retry loop in case DataStore is temporarily throttling
			while tries > 0 and not success do
				success = pcall(function()
					squishyDataStore:SetAsync(playerKey, dataToSave)
				end)
				
				if not success then
					tries = tries - 1
					task.wait(1)
				end
			end
			
			if success then
				print("Successfully saved data for player: " .. player.Name)
			else
				warn("Failed to save data for player: " .. player.Name .. " after 3 retries.")
			end
		end
	end
end

-- Hook up Player Join and Leave events
Players.PlayerAdded:Connect(onPlayerAdded)
Players.PlayerRemoving:Connect(savePlayerData)

-- Handle Server Shutdown (BindToClose ensures data saves in Studio testing)
game:BindToClose(function()
	print("Server shutting down. Saving all players...")
	for _, player in ipairs(Players:GetPlayers()) do
		savePlayerData(player)
	end
end)
