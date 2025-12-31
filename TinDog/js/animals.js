// TinDog - Animal Profiles Database
// 20+ profiles with dogs, cats, birds, and rabbits

const animals = [
  // === DOGS (8 profiles) ===
  {
    id: 1,
    name: "Max",
    type: "dog",
    breed: "Golden Retriever",
    age: 3,
    gender: "Male",
    location: "Brooklyn, NY",
    distance: "2 miles away",
    bio: "Love long walks in the park and belly rubs! Looking for a furry friend to chase squirrels with. I'm loyal, playful, and always ready for an adventure!",
    interests: ["Fetch", "Swimming", "Belly Rubs", "Naps"],
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=500&h=600&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1552053831-71594a27632d?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1612774412771-005ed8e861d2?w=500&h=600&fit=crop"
    ],
    verified: true
  },
  {
    id: 2,
    name: "Bella",
    type: "dog",
    breed: "French Bulldog",
    age: 2,
    gender: "Female",
    location: "Manhattan, NY",
    distance: "1 mile away",
    bio: "Sassy city pup with a love for brunch and people watching. I snore a little but it's adorable, trust me. Looking for someone to share treats with!",
    interests: ["Sunbathing", "Treats", "Cuddles", "Fashion"],
    image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500&h=600&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500&h=600&fit=crop"
    ],
    verified: true
  },
  {
    id: 3,
    name: "Charlie",
    type: "dog",
    breed: "Siberian Husky",
    age: 4,
    gender: "Male",
    location: "Austin, TX",
    distance: "5 miles away",
    bio: "Adventure seeker with stunning blue eyes! I love hiking, running, and howling at the moon. Warning: I have A LOT of energy and shed everywhere!",
    interests: ["Hiking", "Running", "Snow", "Howling"],
    image: "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=500&h=600&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=500&h=600&fit=crop"
    ],
    verified: false
  },
  {
    id: 4,
    name: "Luna",
    type: "dog",
    breed: "Corgi",
    age: 2,
    gender: "Female",
    location: "Seattle, WA",
    distance: "3 miles away",
    bio: "Short legs, big personality! I'm basically a loaf of bread with legs and I'm proud of it. Looking for someone who appreciates my floofy butt!",
    interests: ["Herding", "Treats", "Zoomies", "Being Cute"],
    image: "https://images.unsplash.com/photo-1612536057832-2ff7ead58194?w=500&h=600&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1612536057832-2ff7ead58194?w=500&h=600&fit=crop"
    ],
    verified: true
  },
  {
    id: 5,
    name: "Rocky",
    type: "dog",
    breed: "German Shepherd",
    age: 5,
    gender: "Male",
    location: "Denver, CO",
    distance: "4 miles away",
    bio: "Strong, loyal, and protective. I take my guard dog duties very seriously but I'm also a big softie who loves cuddles. Intelligence is my middle name!",
    interests: ["Training", "Protecting", "Frisbee", "Learning Tricks"],
    image: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=500&h=600&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=500&h=600&fit=crop"
    ],
    verified: true
  },
  {
    id: 6,
    name: "Daisy",
    type: "dog",
    breed: "Beagle",
    age: 3,
    gender: "Female",
    location: "Portland, OR",
    distance: "2 miles away",
    bio: "My nose knows! I'm a professional sniffer and treat detector. I have the cutest howl and I'm not afraid to use it. Food is my love language!",
    interests: ["Sniffing", "Eating", "Howling", "Exploring"],
    image: "https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=500&h=600&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=500&h=600&fit=crop"
    ],
    verified: false
  },
  {
    id: 7,
    name: "Cooper",
    type: "dog",
    breed: "Labrador Retriever",
    age: 4,
    gender: "Male",
    location: "San Diego, CA",
    distance: "6 miles away",
    bio: "Beach bum extraordinaire! Nothing makes me happier than sand between my paws and waves to splash in. I'm basically a professional good boy!",
    interests: ["Beach", "Swimming", "Fetch", "Making Friends"],
    image: "https://images.unsplash.com/photo-1579213838058-5e8f6c7f7b0c?w=500&h=600&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1579213838058-5e8f6c7f7b0c?w=500&h=600&fit=crop"
    ],
    verified: true
  },
  {
    id: 8,
    name: "Sadie",
    type: "dog",
    breed: "Pomeranian",
    age: 2,
    gender: "Female",
    location: "Las Vegas, NV",
    distance: "1 mile away",
    bio: "Small but mighty! I'm a fluffy cloud of sass and attitude. I may be pocket-sized but my personality is XXL. Bow down to the queen!",
    interests: ["Being Fabulous", "Yapping", "Grooming", "Attention"],
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500&h=600&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500&h=600&fit=crop"
    ],
    verified: true
  },

  // === CATS (6 profiles) ===
  {
    id: 9,
    name: "Whiskers",
    type: "cat",
    breed: "Persian",
    age: 4,
    gender: "Male",
    location: "Los Angeles, CA",
    distance: "3 miles away",
    bio: "Fluffy, fabulous, and I know it. I spend my days lounging on expensive furniture and judging everyone. Will consider love if treats are involved.",
    interests: ["Napping", "Grooming", "Judging", "Sunbeams"],
    image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=500&h=600&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=500&h=600&fit=crop"
    ],
    verified: true
  },
  {
    id: 10,
    name: "Shadow",
    type: "cat",
    breed: "Black Cat",
    age: 3,
    gender: "Male",
    location: "Chicago, IL",
    distance: "4 miles away",
    bio: "Mysterious, misunderstood, and absolutely majestic. I'm not bad luck, I'm the best luck you'll ever have! Night owl seeking midnight snack partner.",
    interests: ["Nighttime Zoomies", "Knocking Things Over", "Stealth", "Boxes"],
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500&h=600&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500&h=600&fit=crop"
    ],
    verified: false
  },
  {
    id: 11,
    name: "Mochi",
    type: "cat",
    breed: "Scottish Fold",
    age: 2,
    gender: "Female",
    location: "San Francisco, CA",
    distance: "2 miles away",
    bio: "Internet famous (in my dreams). My folded ears and round face have been breaking hearts since day one. Professional biscuit maker seeking lap to knead!",
    interests: ["Making Biscuits", "Chirping at Birds", "Lap Sitting", "Treats"],
    image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=500&h=600&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=500&h=600&fit=crop"
    ],
    verified: true
  },
  {
    id: 12,
    name: "Oliver",
    type: "cat",
    breed: "Orange Tabby",
    age: 5,
    gender: "Male",
    location: "Boston, MA",
    distance: "5 miles away",
    bio: "Just a big orange boy living my best life. I have one brain cell and I use it to find food. They say orange cats share one braincell... I have it today!",
    interests: ["Eating", "Sleeping", "Being Orange", "Chaos"],
    image: "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=500&h=600&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=500&h=600&fit=crop"
    ],
    verified: true
  },
  {
    id: 13,
    name: "Luna",
    type: "cat",
    breed: "Siamese",
    age: 3,
    gender: "Female",
    location: "Miami, FL",
    distance: "3 miles away",
    bio: "Talkative and I have OPINIONS. I will scream at you until you understand what I want. Blue-eyed beauty with a voice that could wake the neighbors!",
    interests: ["Talking", "Screaming", "Being Dramatic", "Attention"],
    image: "https://images.unsplash.com/photo-1568152950566-c1bf43f4ab28?w=500&h=600&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1568152950566-c1bf43f4ab28?w=500&h=600&fit=crop"
    ],
    verified: false
  },
  {
    id: 14,
    name: "Mittens",
    type: "cat",
    breed: "Tuxedo",
    age: 4,
    gender: "Female",
    location: "Philadelphia, PA",
    distance: "2 miles away",
    bio: "Always dressed for a formal event! I'm sophisticated, elegant, and only slightly chaotic. Looking for someone who appreciates a classy lady.",
    interests: ["Looking Fancy", "3AM Zoomies", "Hunting Toys", "Window Watching"],
    image: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=500&h=600&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=500&h=600&fit=crop"
    ],
    verified: true
  },

  // === BIRDS (3 profiles) ===
  {
    id: 15,
    name: "Rio",
    type: "bird",
    breed: "Scarlet Macaw",
    age: 8,
    gender: "Male",
    location: "Miami, FL",
    distance: "4 miles away",
    bio: "Colorful, loud, and proud! I can say over 50 words and I'm not afraid to use them. Looking for a lifelong partner (literally, I live 50+ years)!",
    interests: ["Talking", "Dancing", "Screaming", "Showing Off"],
    image: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=500&h=600&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=500&h=600&fit=crop"
    ],
    verified: true
  },
  {
    id: 16,
    name: "Sunny",
    type: "bird",
    breed: "Cockatiel",
    age: 3,
    gender: "Female",
    location: "Phoenix, AZ",
    distance: "2 miles away",
    bio: "I whistle better than any human! Cheerful, cuddly, and I do this cute thing where I put my crest up when I'm happy. Seeking someone to serenade!",
    interests: ["Whistling", "Head Scratches", "Mirrors", "Seeds"],
    image: "https://images.unsplash.com/photo-1591198936750-16d8e15edb9e?w=500&h=600&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1591198936750-16d8e15edb9e?w=500&h=600&fit=crop"
    ],
    verified: false
  },
  {
    id: 17,
    name: "Kiwi",
    type: "bird",
    breed: "Budgie",
    age: 2,
    gender: "Male",
    location: "San Jose, CA",
    distance: "3 miles away",
    bio: "Small birb, big dreams! I'm learning to talk and my vocabulary includes 'pretty bird' and various kissing sounds. Will chirp my way into your heart!",
    interests: ["Chirping", "Flying", "Bells", "Millet"],
    image: "https://images.unsplash.com/photo-1544923408-75c5cef46f14?w=500&h=600&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1544923408-75c5cef46f14?w=500&h=600&fit=crop"
    ],
    verified: true
  },

  // === RABBITS (3 profiles) ===
  {
    id: 18,
    name: "Cinnamon",
    type: "rabbit",
    breed: "Holland Lop",
    age: 2,
    gender: "Female",
    location: "Portland, OR",
    distance: "1 mile away",
    bio: "Floppy ears, fluffy butt, unlimited cuteness! I do binkies when I'm happy and I'm always happy. Professional hay muncher seeking carrot companion!",
    interests: ["Binkying", "Hay", "Digging", "Being Adorable"],
    image: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=500&h=600&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=500&h=600&fit=crop"
    ],
    verified: true
  },
  {
    id: 19,
    name: "Oreo",
    type: "rabbit",
    breed: "Dutch Rabbit",
    age: 3,
    gender: "Male",
    location: "Minneapolis, MN",
    distance: "4 miles away",
    bio: "Classic black and white cutie! I'm calm, cuddly, and I promise not to chew your cables (maybe). Looking for someone to share my hay pile with!",
    interests: ["Cuddling", "Thumping", "Vegetables", "Exploring"],
    image: "https://images.unsplash.com/photo-1535241749838-299c4c8e671a?w=500&h=600&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1535241749838-299c4c8e671a?w=500&h=600&fit=crop"
    ],
    verified: false
  },
  {
    id: 20,
    name: "Snowball",
    type: "rabbit",
    breed: "Lionhead",
    age: 1,
    gender: "Female",
    location: "Salt Lake City, UT",
    distance: "2 miles away",
    bio: "Fluffy mane, don't care! I look like a tiny lion but I'm 100% bunny. Young, energetic, and ready to hop into your heart. Nose boops welcome!",
    interests: ["Hopping", "Being Fluffy", "Banana Treats", "Nose Boops"],
    image: "https://images.unsplash.com/photo-1589933767411-38a58367efd7?w=500&h=600&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1589933767411-38a58367efd7?w=500&h=600&fit=crop"
    ],
    verified: true
  }
];

// Utility functions
function getAnimalById(id) {
  return animals.find(animal => animal.id === id);
}

function getAnimalsByType(type) {
  return animals.filter(animal => animal.type === type);
}

function shuffleAnimals() {
  return [...animals].sort(() => Math.random() - 0.5);
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { animals, getAnimalById, getAnimalsByType, shuffleAnimals };
}
