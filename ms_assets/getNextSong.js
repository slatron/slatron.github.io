const songs = ["Discoverer", "Living Well is the Best Revenge", "Supernatural Superserious", "I’ll Take the Rain", "Hope", "Sad Professor", "Walk Unafraid", "Leave", "What’s the Frequency, Kenneth?", "Sweetness Follows", "Near Wild Heaven", "You Are the Everything", "Turn You Inside Out", "Finest Worksong", "Exhuming McCarthy", "Begin the Begin", "These Days", "I Believe", "Driver 8", "Harborcoat", "Pretty Persuasion", "Radio Free Europe", "Sitting Still", "Shaking Through", "Carnival of Sorts (Boxcar)"]
const chosen = Math.ceil(Math.random() * songs.length - 1)
console.log(songs[chosen])