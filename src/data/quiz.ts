import { CategoryId } from '../types';

export type QuizOption = {
  text: string;
  tags: CategoryId[];
  correct?: boolean;
};

export type QuizQuestion = {
  id: number;
  question: string;
  options: QuizOption[];
};

export type QuizLevel = {
  id: number;
  title: string;
  questions: QuizQuestion[];
};

export const PASS_THRESHOLD = 5;

export const QUIZ_LEVELS: QuizLevel[] = [
  {
    id: 1,
    title: 'Classic Comfort',
    questions: [
      {
        id: 101,
        question: 'What do you want right now?',
        options: [
          { text: 'Something light', tags: ['cafes'] },
          { text: 'Something sweet', tags: ['cafes'] },
          { text: 'Something filling', tags: ['classic'], correct: true },
          { text: 'Something quick', tags: ['street'] },
        ],
      },
      {
        id: 102,
        question: 'How much time do you have?',
        options: [
          { text: 'About 10 minutes', tags: ['street'] },
          { text: 'Thirty minutes or more', tags: ['classic'], correct: true },
          { text: 'Barely any time', tags: ['street'] },
          { text: 'Just a short break', tags: ['cafes'] },
        ],
      },
      {
        id: 103,
        question: 'What sounds better tonight?',
        options: [
          { text: 'Meat and potatoes', tags: ['classic'], correct: true },
          { text: 'Coffee and cake', tags: ['cafes'] },
          { text: 'Street food on the go', tags: ['street'] },
          { text: 'Asian-inspired dishes', tags: ['modern'] },
        ],
      },
      {
        id: 104,
        question: "What's your mood?",
        options: [
          { text: 'Relaxed and unhurried', tags: ['cafes'] },
          { text: 'Hungry and focused', tags: ['classic'], correct: true },
          { text: 'Curious for something new', tags: ['modern'] },
          { text: 'In a rush', tags: ['street'] },
        ],
      },
      {
        id: 105,
        question: 'What matters most?',
        options: [
          { text: 'Speed of service', tags: ['street'] },
          { text: 'Comfort food', tags: ['classic'], correct: true },
          { text: 'Fair price', tags: ['street'] },
          { text: 'Variety on the menu', tags: ['modern'] },
        ],
      },
      {
        id: 106,
        question: 'Preferred place style?',
        options: [
          { text: 'Proper restaurant', tags: ['classic'], correct: true },
          { text: 'Street stand', tags: ['street'] },
          { text: 'Neighborhood café', tags: ['cafes'] },
          { text: 'Food court', tags: ['street'] },
        ],
      },
      {
        id: 107,
        question: 'How hungry are you?',
        options: [
          { text: 'Very hungry', tags: ['classic'], correct: true },
          { text: 'Slightly hungry', tags: ['cafes'] },
          { text: 'Just bored', tags: ['cafes'] },
          { text: 'Not sure yet', tags: ['modern'] },
        ],
      },
      {
        id: 108,
        question: "What's the first thing you'd skip?",
        options: [
          { text: 'Dessert', tags: ['classic'] },
          { text: 'Drinks', tags: ['street'] },
          { text: 'The main meal', tags: ['cafes'] },
          { text: 'Snacks', tags: ['classic'], correct: true },
        ],
      },
    ],
  },

  {
    id: 2,
    title: 'Street Quick Bite',
    questions: [
      {
        id: 201,
        question: 'What do you need?',
        options: [
          { text: 'A quick bite', tags: ['street'], correct: true },
          { text: 'A full dinner', tags: ['classic'] },
          { text: 'Just coffee', tags: ['cafes'] },
          { text: 'Something new to try', tags: ['modern'] },
        ],
      },
      {
        id: 202,
        question: 'Time available?',
        options: [
          { text: 'Five to ten minutes', tags: ['street'], correct: true },
          { text: 'Around twenty minutes', tags: ['cafes'] },
          { text: 'A full hour', tags: ['classic'] },
          { text: "Doesn't matter", tags: ['modern'] },
        ],
      },
      {
        id: 203,
        question: 'Pick a food:',
        options: [
          { text: 'Döner', tags: ['street'], correct: true },
          { text: 'Schnitzel', tags: ['classic'] },
          { text: 'Cake', tags: ['cafes'] },
          { text: 'Sushi', tags: ['modern'] },
        ],
      },
      {
        id: 204,
        question: 'How do you want to eat it?',
        options: [
          { text: 'On the go', tags: ['street'], correct: true },
          { text: 'Sitting down', tags: ['classic'] },
          { text: 'Slowly, taking my time', tags: ['cafes'] },
          { text: 'Socially with friends', tags: ['classic'] },
        ],
      },
      {
        id: 205,
        question: 'Hunger level?',
        options: [
          { text: 'Medium', tags: ['cafes'] },
          { text: 'Low', tags: ['cafes'] },
          { text: 'Fast and hungry', tags: ['street'], correct: true },
          { text: 'Just want a taste', tags: ['modern'] },
        ],
      },
      {
        id: 206,
        question: 'What do you want to avoid?',
        options: [
          { text: 'Long waits', tags: ['street'], correct: true },
          { text: 'Noise', tags: ['cafes'] },
          { text: 'Too much sugar', tags: ['modern'] },
          { text: 'Meat', tags: ['modern'] },
        ],
      },
      {
        id: 207,
        question: 'Best option right now?',
        options: [
          { text: 'Street food', tags: ['street'], correct: true },
          { text: 'Restaurant', tags: ['classic'] },
          { text: 'Café', tags: ['cafes'] },
          { text: 'Fine dining', tags: ['modern'] },
        ],
      },
      {
        id: 208,
        question: 'Where are you right now?',
        options: [
          { text: 'Outside, moving around', tags: ['street'], correct: true },
          { text: 'At home', tags: ['cafes'] },
          { text: 'At work', tags: ['street'] },
          { text: 'Relaxing somewhere', tags: ['cafes'] },
        ],
      },
    ],
  },

  {
    id: 3,
    title: 'Café Morning',
    questions: [
      {
        id: 301,
        question: 'What are you craving?',
        options: [
          { text: 'Coffee and dessert', tags: ['cafes'], correct: true },
          { text: 'Meat', tags: ['classic'] },
          { text: 'Fast food', tags: ['street'] },
          { text: 'Asian dishes', tags: ['modern'] },
        ],
      },
      {
        id: 302,
        question: 'How is your schedule?',
        options: [
          { text: 'Flexible all day', tags: ['modern'] },
          { text: 'Relaxed morning', tags: ['cafes'], correct: true },
          { text: 'Rushing through it', tags: ['street'] },
          { text: 'Late night', tags: ['classic'] },
        ],
      },
      {
        id: 303,
        question: 'Best combo?',
        options: [
          { text: 'Cappuccino and pastry', tags: ['cafes'], correct: true },
          { text: 'Beer and sausage', tags: ['classic'] },
          { text: 'Burger and fries', tags: ['street'] },
          { text: 'Ramen bowl', tags: ['modern'] },
        ],
      },
      {
        id: 304,
        question: 'Mood?',
        options: [
          { text: 'Calm', tags: ['cafes'], correct: true },
          { text: 'Hungry', tags: ['classic'] },
          { text: 'Fast-paced', tags: ['street'] },
          { text: 'Adventurous', tags: ['modern'] },
        ],
      },
      {
        id: 305,
        question: 'Why are you eating?',
        options: [
          { text: 'To enjoy the moment', tags: ['cafes'], correct: true },
          { text: 'To fill my stomach', tags: ['classic'] },
          { text: 'Quick break from work', tags: ['street'] },
          { text: 'To try something new', tags: ['modern'] },
        ],
      },
      {
        id: 306,
        question: 'Type of place?',
        options: [
          { text: 'Café', tags: ['cafes'], correct: true },
          { text: 'Restaurant', tags: ['classic'] },
          { text: 'Street corner', tags: ['street'] },
          { text: 'Bar', tags: ['modern'] },
        ],
      },
      {
        id: 307,
        question: 'Sweet or salty?',
        options: [
          { text: 'Sweet', tags: ['cafes'], correct: true },
          { text: 'Salty', tags: ['street'] },
          { text: 'A bit of both', tags: ['modern'] },
          { text: 'Neither really', tags: ['classic'] },
        ],
      },
      {
        id: 308,
        question: 'What matters most tonight?',
        options: [
          { text: 'Atmosphere', tags: ['cafes'], correct: true },
          { text: 'Speed', tags: ['street'] },
          { text: 'Price', tags: ['street'] },
          { text: 'Portion size', tags: ['classic'] },
        ],
      },
    ],
  },

  {
    id: 4,
    title: 'Modern Adventure',
    questions: [
      {
        id: 401,
        question: 'Feel like trying something new?',
        options: [
          { text: 'Absolutely yes', tags: ['modern'], correct: true },
          { text: 'Not really', tags: ['classic'] },
          { text: 'Maybe', tags: ['cafes'] },
          { text: 'Depends on the place', tags: ['modern'] },
        ],
      },
      {
        id: 402,
        question: 'Which cuisine pulls you?',
        options: [
          { text: 'Asian or fusion', tags: ['modern'], correct: true },
          { text: 'Traditional German', tags: ['classic'] },
          { text: 'Fast food', tags: ['street'] },
          { text: 'Bakery-style bites', tags: ['cafes'] },
        ],
      },
      {
        id: 403,
        question: 'Describe your mood:',
        options: [
          { text: 'Curious', tags: ['modern'], correct: true },
          { text: 'Hungry', tags: ['classic'] },
          { text: 'Tired', tags: ['cafes'] },
          { text: 'Lazy', tags: ['cafes'] },
        ],
      },
      {
        id: 404,
        question: 'How is your time?',
        options: [
          { text: 'Plenty of it', tags: ['modern'], correct: true },
          { text: 'None to spare', tags: ['street'] },
          { text: 'Enough for a sit-down', tags: ['classic'] },
          { text: 'Short window', tags: ['street'] },
        ],
      },
      {
        id: 405,
        question: 'What experience do you want?',
        options: [
          { text: 'Try something different', tags: ['modern'], correct: true },
          { text: 'A safe, reliable choice', tags: ['classic'] },
          { text: 'Cheap and filling', tags: ['street'] },
          { text: 'Fast and done', tags: ['street'] },
        ],
      },
      {
        id: 406,
        question: 'Type of venue?',
        options: [
          { text: 'Modern restaurant', tags: ['modern'], correct: true },
          { text: 'Street food market', tags: ['street'] },
          { text: 'Quiet café', tags: ['cafes'] },
          { text: 'Classic tavern', tags: ['classic'] },
        ],
      },
      {
        id: 407,
        question: 'Food style preference?',
        options: [
          { text: 'Creative, plated dishes', tags: ['modern'], correct: true },
          { text: 'Heavy traditional meals', tags: ['classic'] },
          { text: 'Quick snacks', tags: ['street'] },
          { text: 'Desserts and pastries', tags: ['cafes'] },
        ],
      },
      {
        id: 408,
        question: "What's your goal?",
        options: [
          { text: 'Discover a new taste', tags: ['modern'], correct: true },
          { text: 'Eat fast and move on', tags: ['street'] },
          { text: 'Relax in a good spot', tags: ['cafes'] },
          { text: 'Save some money', tags: ['street'] },
        ],
      },
    ],
  },

  {
    id: 5,
    title: 'Cozy Evening',
    questions: [
      {
        id: 501,
        question: 'What are you after?',
        options: [
          { text: 'Something balanced', tags: ['modern'] },
          { text: 'Something heavy', tags: ['classic'] },
          { text: 'Something different', tags: ['modern'] },
          { text: 'Something chill', tags: ['cafes'], correct: true },
        ],
      },
      {
        id: 502,
        question: 'Current mood?',
        options: [
          { text: 'Calm and laid-back', tags: ['cafes'], correct: true },
          { text: 'Really hungry', tags: ['classic'] },
          { text: 'Excited to go out', tags: ['modern'] },
          { text: 'Busy, under pressure', tags: ['street'] },
        ],
      },
      {
        id: 503,
        question: 'Best match?',
        options: [
          { text: 'Café or casual bistro', tags: ['cafes'], correct: true },
          { text: 'Street food stand', tags: ['street'] },
          { text: 'Fine dining restaurant', tags: ['modern'] },
          { text: 'Fast food chain', tags: ['street'] },
        ],
      },
      {
        id: 504,
        question: 'Time situation?',
        options: [
          { text: 'No rush tonight', tags: ['cafes'], correct: true },
          { text: 'Fast as possible', tags: ['street'] },
          { text: 'Limited but okay', tags: ['classic'] },
          { text: 'Very short window', tags: ['street'] },
        ],
      },
      {
        id: 505,
        question: 'Why this meal?',
        options: [
          { text: 'Relax and enjoy', tags: ['cafes'], correct: true },
          { text: 'Fill up properly', tags: ['classic'] },
          { text: 'Try something new', tags: ['modern'] },
          { text: 'Quick break', tags: ['street'] },
        ],
      },
      {
        id: 506,
        question: 'Food type?',
        options: [
          { text: 'Light meals', tags: ['cafes'], correct: true },
          { text: 'Meat-heavy', tags: ['classic'] },
          { text: 'Fried and crunchy', tags: ['street'] },
          { text: 'Exotic flavors', tags: ['modern'] },
        ],
      },
      {
        id: 507,
        question: 'Preferred vibe?',
        options: [
          { text: 'Cozy and warm', tags: ['cafes'], correct: true },
          { text: 'Loud and lively', tags: ['classic'] },
          { text: 'Busy and buzzing', tags: ['street'] },
          { text: 'Fast and functional', tags: ['street'] },
        ],
      },
      {
        id: 508,
        question: 'Top priority?',
        options: [
          { text: 'Comfort', tags: ['cafes'], correct: true },
          { text: 'Speed', tags: ['street'] },
          { text: 'Price', tags: ['street'] },
          { text: 'Portion size', tags: ['classic'] },
        ],
      },
    ],
  },

  {
    id: 6,
    title: 'Beer Hall Hunger',
    questions: [
      {
        id: 601,
        question: 'What calls you right now?',
        options: [
          { text: 'A rich hearty plate', tags: ['classic'], correct: true },
          { text: 'Something snappy', tags: ['street'] },
          { text: 'A tradition-rooted meal', tags: ['classic'] },
          { text: 'A sweet treat', tags: ['cafes'] },
        ],
      },
      {
        id: 602,
        question: 'Which of these fits your head today?',
        options: [
          { text: 'Curious explorer', tags: ['modern'] },
          { text: 'Food-focused and serious', tags: ['classic'], correct: true },
          { text: 'Sluggish and slow', tags: ['cafes'] },
          { text: 'Very social', tags: ['classic'] },
        ],
      },
      {
        id: 603,
        question: 'Pick a dish:',
        options: [
          { text: 'Schnitzel or sausage', tags: ['classic'], correct: true },
          { text: 'Slice of cake', tags: ['cafes'] },
          { text: 'Burger and fries', tags: ['street'] },
          { text: 'Maki rolls', tags: ['modern'] },
        ],
      },
      {
        id: 604,
        question: 'How much time do you have?',
        options: [
          { text: 'A proper dinner amount', tags: ['classic'], correct: true },
          { text: 'Barely any', tags: ['street'] },
          { text: 'A reasonable window', tags: ['modern'] },
          { text: 'It honestly does not matter', tags: ['cafes'] },
        ],
      },
      {
        id: 605,
        question: 'How hungry, really?',
        options: [
          { text: 'Moderately', tags: ['cafes'] },
          { text: 'Seriously hungry', tags: ['classic'], correct: true },
          { text: 'Not very', tags: ['cafes'] },
          { text: 'Hard to tell', tags: ['modern'] },
        ],
      },
      {
        id: 606,
        question: 'What matters tonight?',
        options: [
          { text: 'Getting it fast', tags: ['street'] },
          { text: 'Great taste', tags: ['modern'] },
          { text: 'Tradition and roots', tags: ['classic'], correct: true },
          { text: 'Keeping it cheap', tags: ['street'] },
        ],
      },
      {
        id: 607,
        question: 'Where are you heading?',
        options: [
          { text: 'Traditional restaurant', tags: ['classic'], correct: true },
          { text: 'Street stand', tags: ['street'] },
          { text: 'Local café', tags: ['cafes'] },
          { text: 'Cocktail bar with food', tags: ['modern'] },
        ],
      },
      {
        id: 608,
        question: 'First thing you rule out?',
        options: [
          { text: 'Waiting around', tags: ['street'] },
          { text: 'Fast food', tags: ['classic'] },
          { text: 'Light, tiny meals', tags: ['classic'], correct: true },
          { text: 'Snack portions', tags: ['classic'] },
        ],
      },
    ],
  },

  {
    id: 7,
    title: 'Grab and Go',
    questions: [
      {
        id: 701,
        question: 'What do you feel like?',
        options: [
          { text: 'Fast food basics', tags: ['street'] },
          { text: 'Something sweet', tags: ['cafes'] },
          { text: 'Quick and simple', tags: ['street'], correct: true },
          { text: 'A real fine dining night', tags: ['modern'] },
        ],
      },
      {
        id: 702,
        question: 'Time on the clock?',
        options: [
          { text: 'Very short', tags: ['street'], correct: true },
          { text: 'Medium window', tags: ['classic'] },
          { text: 'Long evening', tags: ['modern'] },
          { text: 'Flexible', tags: ['cafes'] },
        ],
      },
      {
        id: 703,
        question: 'Choose one:',
        options: [
          { text: 'Döner or crispy fries', tags: ['street'], correct: true },
          { text: 'Slice of cake', tags: ['cafes'] },
          { text: 'Juicy steak', tags: ['classic'] },
          { text: 'Bowl of ramen', tags: ['modern'] },
        ],
      },
      {
        id: 704,
        question: 'Your eating style?',
        options: [
          { text: 'Walking around', tags: ['street'], correct: true },
          { text: 'Sitting at a table', tags: ['classic'] },
          { text: 'Slow and relaxed', tags: ['cafes'] },
          { text: 'Formal setting', tags: ['modern'] },
        ],
      },
      {
        id: 705,
        question: 'Hunger type?',
        options: [
          { text: 'Sharp quick hunger', tags: ['street'], correct: true },
          { text: 'Low-grade', tags: ['cafes'] },
          { text: 'Moderate', tags: ['cafes'] },
          { text: 'Strong and deep', tags: ['classic'] },
        ],
      },
      {
        id: 706,
        question: 'Main priority?',
        options: [
          { text: 'Speed', tags: ['street'], correct: true },
          { text: 'Atmosphere', tags: ['cafes'] },
          { text: 'Price', tags: ['street'] },
          { text: 'Overall taste', tags: ['modern'] },
        ],
      },
      {
        id: 707,
        question: 'Place type?',
        options: [
          { text: 'Street food spot', tags: ['street'], correct: true },
          { text: 'Full-service restaurant', tags: ['classic'] },
          { text: 'Quiet café', tags: ['cafes'] },
          { text: 'Stylish lounge', tags: ['modern'] },
        ],
      },
      {
        id: 708,
        question: 'What do you want to skip?',
        options: [
          { text: 'Huge menus', tags: ['classic'] },
          { text: 'Waiting in line', tags: ['street'], correct: true },
          { text: 'Noisy rooms', tags: ['cafes'] },
          { text: 'Desserts', tags: ['modern'] },
        ],
      },
    ],
  },

  {
    id: 8,
    title: 'Afternoon Treat',
    questions: [
      {
        id: 801,
        question: "What's on your mind?",
        options: [
          { text: 'Coffee with dessert', tags: ['cafes'], correct: true },
          { text: 'A big meat dish', tags: ['classic'] },
          { text: 'Fast food fix', tags: ['street'] },
          { text: 'Fresh sushi', tags: ['modern'] },
        ],
      },
      {
        id: 802,
        question: 'Your mood?',
        options: [
          { text: 'Calm, drifting', tags: ['cafes'], correct: true },
          { text: 'Quite hungry', tags: ['classic'] },
          { text: 'Busy and on edge', tags: ['street'] },
          { text: 'Curious', tags: ['modern'] },
        ],
      },
      {
        id: 803,
        question: 'Best pairing?',
        options: [
          { text: 'Espresso and pastry', tags: ['cafes'], correct: true },
          { text: 'Beer and sausage', tags: ['classic'] },
          { text: 'Burger and cola', tags: ['street'] },
          { text: 'Noodles and tea', tags: ['modern'] },
        ],
      },
      {
        id: 804,
        question: 'Time feels…',
        options: [
          { text: 'Relaxed, no rush', tags: ['cafes'], correct: true },
          { text: 'Tight', tags: ['street'] },
          { text: 'Medium', tags: ['classic'] },
          { text: 'Racing', tags: ['street'] },
        ],
      },
      {
        id: 805,
        question: 'Why eat now?',
        options: [
          { text: 'Enjoy a slow moment', tags: ['cafes'], correct: true },
          { text: 'Fill up the stomach', tags: ['classic'] },
          { text: 'Quick recharge', tags: ['street'] },
          { text: 'Discover a new flavor', tags: ['modern'] },
        ],
      },
      {
        id: 806,
        question: 'Venue pick?',
        options: [
          { text: 'Cozy café', tags: ['cafes'], correct: true },
          { text: 'Street corner', tags: ['street'] },
          { text: 'Sit-down restaurant', tags: ['classic'] },
          { text: 'Bar with small plates', tags: ['modern'] },
        ],
      },
      {
        id: 807,
        question: 'Flavor now?',
        options: [
          { text: 'Sweet', tags: ['cafes'], correct: true },
          { text: 'Salty', tags: ['street'] },
          { text: 'Sweet and salty together', tags: ['modern'] },
          { text: 'Neutral, nothing strong', tags: ['classic'] },
        ],
      },
      {
        id: 808,
        question: 'Focus on?',
        options: [
          { text: 'Atmosphere and seating', tags: ['cafes'], correct: true },
          { text: 'Getting served quickly', tags: ['street'] },
          { text: 'Keeping cost low', tags: ['street'] },
          { text: 'Big portion size', tags: ['classic'] },
        ],
      },
    ],
  },

  {
    id: 9,
    title: 'New Flavors',
    questions: [
      {
        id: 901,
        question: 'What are you after today?',
        options: [
          { text: 'Something brand new', tags: ['modern'], correct: true },
          { text: 'Something classic', tags: ['classic'] },
          { text: 'Something fast', tags: ['street'] },
          { text: 'Something very light', tags: ['cafes'] },
        ],
      },
      {
        id: 902,
        question: 'Cuisine direction?',
        options: [
          { text: 'Fusion or Asian', tags: ['modern'], correct: true },
          { text: 'Traditional German', tags: ['classic'] },
          { text: 'Fast food', tags: ['street'] },
          { text: 'Bakery', tags: ['cafes'] },
        ],
      },
      {
        id: 903,
        question: 'Your mood fits:',
        options: [
          { text: 'Exploring', tags: ['modern'], correct: true },
          { text: 'Hungry', tags: ['classic'] },
          { text: 'Tired', tags: ['cafes'] },
          { text: 'Calm', tags: ['cafes'] },
        ],
      },
      {
        id: 904,
        question: 'Time situation?',
        options: [
          { text: 'Plenty of time', tags: ['modern'], correct: true },
          { text: 'Short window', tags: ['street'] },
          { text: 'Medium', tags: ['classic'] },
          { text: 'Gotta be fast', tags: ['street'] },
        ],
      },
      {
        id: 905,
        question: 'Why eat out tonight?',
        options: [
          { text: 'Discover a new taste', tags: ['modern'], correct: true },
          { text: 'Fill up', tags: ['classic'] },
          { text: 'Quick pit stop', tags: ['street'] },
          { text: 'Relax somewhere', tags: ['cafes'] },
        ],
      },
      {
        id: 906,
        question: 'Place vibe?',
        options: [
          { text: 'Modern restaurant', tags: ['modern'], correct: true },
          { text: 'Street food spot', tags: ['street'] },
          { text: 'Café', tags: ['cafes'] },
          { text: 'Traditional tavern', tags: ['classic'] },
        ],
      },
      {
        id: 907,
        question: 'Style of food?',
        options: [
          { text: 'Creative, plated dishes', tags: ['modern'], correct: true },
          { text: 'Heavy and filling', tags: ['classic'] },
          { text: 'Small snacks', tags: ['street'] },
          { text: 'Desserts', tags: ['cafes'] },
        ],
      },
      {
        id: 908,
        question: 'Top priority?',
        options: [
          { text: 'A new experience', tags: ['modern'], correct: true },
          { text: 'Speed', tags: ['street'] },
          { text: 'Price', tags: ['street'] },
          { text: 'Comfort', tags: ['cafes'] },
        ],
      },
    ],
  },

  {
    id: 10,
    title: 'Slow Vibe',
    questions: [
      {
        id: 1001,
        question: 'What do you want now?',
        options: [
          { text: 'Something cozy', tags: ['cafes'], correct: true },
          { text: 'Something heavy', tags: ['classic'] },
          { text: 'Something quick', tags: ['street'] },
          { text: 'Something exotic', tags: ['modern'] },
        ],
      },
      {
        id: 1002,
        question: 'Describe your mood:',
        options: [
          { text: 'Relaxed', tags: ['cafes'], correct: true },
          { text: 'Hungry', tags: ['classic'] },
          { text: 'Busy', tags: ['street'] },
          { text: 'Curious', tags: ['modern'] },
        ],
      },
      {
        id: 1003,
        question: 'Best option tonight?',
        options: [
          { text: 'Café or chill place', tags: ['cafes'], correct: true },
          { text: 'Street food', tags: ['street'] },
          { text: 'Restaurant', tags: ['classic'] },
          { text: 'Fine dining', tags: ['modern'] },
        ],
      },
      {
        id: 1004,
        question: 'Time feels:',
        options: [
          { text: 'No rush', tags: ['cafes'], correct: true },
          { text: 'Short', tags: ['street'] },
          { text: 'Medium', tags: ['classic'] },
          { text: 'Very fast', tags: ['street'] },
        ],
      },
      {
        id: 1005,
        question: 'Why eat?',
        options: [
          { text: 'Enjoy and relax', tags: ['cafes'], correct: true },
          { text: 'Fill stomach', tags: ['classic'] },
          { text: 'Quick break', tags: ['street'] },
          { text: 'Try something new', tags: ['modern'] },
        ],
      },
      {
        id: 1006,
        question: 'Food type?',
        options: [
          { text: 'Light meals', tags: ['cafes'], correct: true },
          { text: 'Meat', tags: ['classic'] },
          { text: 'Fried', tags: ['street'] },
          { text: 'Fusion', tags: ['modern'] },
        ],
      },
      {
        id: 1007,
        question: 'Place vibe?',
        options: [
          { text: 'Cozy', tags: ['cafes'], correct: true },
          { text: 'Loud', tags: ['classic'] },
          { text: 'Busy', tags: ['street'] },
          { text: 'Fast-paced', tags: ['street'] },
        ],
      },
      {
        id: 1008,
        question: 'Top priority?',
        options: [
          { text: 'Comfort', tags: ['cafes'], correct: true },
          { text: 'Speed', tags: ['street'] },
          { text: 'Price', tags: ['street'] },
          { text: 'Portion size', tags: ['classic'] },
        ],
      },
    ],
  },

  {
    id: 11,
    title: 'Big Appetite',
    questions: [
      {
        id: 1101,
        question: 'What do you want most?',
        options: [
          { text: 'Something really heavy', tags: ['classic'], correct: true },
          { text: 'Something quick', tags: ['street'] },
          { text: 'Something sweet', tags: ['cafes'] },
          { text: 'Something new', tags: ['modern'] },
        ],
      },
      {
        id: 1102,
        question: 'Mood right now?',
        options: [
          { text: 'Starving', tags: ['classic'], correct: true },
          { text: 'Calm', tags: ['cafes'] },
          { text: 'Busy', tags: ['street'] },
          { text: 'Curious', tags: ['modern'] },
        ],
      },
      {
        id: 1103,
        question: 'Pick a meal:',
        options: [
          { text: 'Schnitzel with sides', tags: ['classic'], correct: true },
          { text: 'Döner from the stand', tags: ['street'] },
          { text: 'Cake and latte', tags: ['cafes'] },
          { text: 'Fresh sushi set', tags: ['modern'] },
        ],
      },
      {
        id: 1104,
        question: 'Time available?',
        options: [
          { text: 'Full sit-down time', tags: ['classic'], correct: true },
          { text: 'Very little', tags: ['street'] },
          { text: 'Medium', tags: ['cafes'] },
          { text: "Doesn't really matter", tags: ['modern'] },
        ],
      },
      {
        id: 1105,
        question: 'Hunger level?',
        options: [
          { text: 'Very high', tags: ['classic'], correct: true },
          { text: 'Medium', tags: ['cafes'] },
          { text: 'Low', tags: ['cafes'] },
          { text: 'Not sure', tags: ['modern'] },
        ],
      },
      {
        id: 1106,
        question: 'What matters most?',
        options: [
          { text: 'Portion size', tags: ['classic'], correct: true },
          { text: 'Speed', tags: ['street'] },
          { text: 'Price', tags: ['street'] },
          { text: 'Atmosphere', tags: ['cafes'] },
        ],
      },
      {
        id: 1107,
        question: 'Place type?',
        options: [
          { text: 'Restaurant', tags: ['classic'], correct: true },
          { text: 'Street stand', tags: ['street'] },
          { text: 'Café', tags: ['cafes'] },
          { text: 'Bar', tags: ['modern'] },
        ],
      },
      {
        id: 1108,
        question: 'What to avoid?',
        options: [
          { text: 'Light meals', tags: ['classic'], correct: true },
          { text: 'Waiting', tags: ['street'] },
          { text: 'Small snacks', tags: ['classic'] },
          { text: 'Sugar bombs', tags: ['modern'] },
        ],
      },
    ],
  },

  {
    id: 12,
    title: 'Fast Fix',
    questions: [
      {
        id: 1201,
        question: 'What do you need now?',
        options: [
          { text: 'A fast bite', tags: ['street'], correct: true },
          { text: 'A full meal', tags: ['classic'] },
          { text: 'Just dessert', tags: ['cafes'] },
          { text: 'Fine dining', tags: ['modern'] },
        ],
      },
      {
        id: 1202,
        question: 'How much time?',
        options: [
          { text: 'Very short', tags: ['street'], correct: true },
          { text: 'Medium', tags: ['classic'] },
          { text: 'Long', tags: ['modern'] },
          { text: 'Flexible', tags: ['cafes'] },
        ],
      },
      {
        id: 1203,
        question: 'Pick one:',
        options: [
          { text: 'Currywurst with fries', tags: ['street'], correct: true },
          { text: 'Grilled steak', tags: ['classic'] },
          { text: 'Cheesecake slice', tags: ['cafes'] },
          { text: 'Ramen bowl', tags: ['modern'] },
        ],
      },
      {
        id: 1204,
        question: 'Eating style?',
        options: [
          { text: 'On the go', tags: ['street'], correct: true },
          { text: 'Sitting', tags: ['classic'] },
          { text: 'Relaxed', tags: ['cafes'] },
          { text: 'Formal', tags: ['modern'] },
        ],
      },
      {
        id: 1205,
        question: 'Hunger?',
        options: [
          { text: 'Quick hunger', tags: ['street'], correct: true },
          { text: 'Low', tags: ['cafes'] },
          { text: 'Medium', tags: ['cafes'] },
          { text: 'High', tags: ['classic'] },
        ],
      },
      {
        id: 1206,
        question: 'Priority?',
        options: [
          { text: 'Speed', tags: ['street'], correct: true },
          { text: 'Taste', tags: ['modern'] },
          { text: 'Price', tags: ['street'] },
          { text: 'Atmosphere', tags: ['cafes'] },
        ],
      },
      {
        id: 1207,
        question: 'Where?',
        options: [
          { text: 'Street food', tags: ['street'], correct: true },
          { text: 'Restaurant', tags: ['classic'] },
          { text: 'Café', tags: ['cafes'] },
          { text: 'Lounge', tags: ['modern'] },
        ],
      },
      {
        id: 1208,
        question: 'Skip?',
        options: [
          { text: 'Waiting', tags: ['street'], correct: true },
          { text: 'Noise', tags: ['cafes'] },
          { text: 'Desserts', tags: ['classic'] },
          { text: 'Drinks', tags: ['modern'] },
        ],
      },
    ],
  },

  {
    id: 13,
    title: 'Sweet Moment',
    questions: [
      {
        id: 1301,
        question: 'What are you craving?',
        options: [
          { text: 'Coffee and dessert', tags: ['cafes'], correct: true },
          { text: 'Meat', tags: ['classic'] },
          { text: 'Fast food', tags: ['street'] },
          { text: 'Asian flavors', tags: ['modern'] },
        ],
      },
      {
        id: 1302,
        question: 'Mood?',
        options: [
          { text: 'Calm and relaxed', tags: ['cafes'], correct: true },
          { text: 'Hungry', tags: ['classic'] },
          { text: 'Busy', tags: ['street'] },
          { text: 'Curious', tags: ['modern'] },
        ],
      },
      {
        id: 1303,
        question: 'Best combo?',
        options: [
          { text: 'Cappuccino and pastry', tags: ['cafes'], correct: true },
          { text: 'Beer and sausage', tags: ['classic'] },
          { text: 'Burger and fries', tags: ['street'] },
          { text: 'Noodles', tags: ['modern'] },
        ],
      },
      {
        id: 1304,
        question: 'Time?',
        options: [
          { text: 'Relaxed', tags: ['cafes'], correct: true },
          { text: 'Short', tags: ['street'] },
          { text: 'Medium', tags: ['classic'] },
          { text: 'Fast', tags: ['street'] },
        ],
      },
      {
        id: 1305,
        question: 'Why eat?',
        options: [
          { text: 'Enjoy the moment', tags: ['cafes'], correct: true },
          { text: 'Fill up', tags: ['classic'] },
          { text: 'Quick break', tags: ['street'] },
          { text: 'Try new', tags: ['modern'] },
        ],
      },
      {
        id: 1306,
        question: 'Place?',
        options: [
          { text: 'Café', tags: ['cafes'], correct: true },
          { text: 'Street', tags: ['street'] },
          { text: 'Restaurant', tags: ['classic'] },
          { text: 'Bar', tags: ['modern'] },
        ],
      },
      {
        id: 1307,
        question: 'Taste?',
        options: [
          { text: 'Sweet', tags: ['cafes'], correct: true },
          { text: 'Salty', tags: ['street'] },
          { text: 'Both', tags: ['modern'] },
          { text: 'Neither', tags: ['classic'] },
        ],
      },
      {
        id: 1308,
        question: 'Focus?',
        options: [
          { text: 'Atmosphere', tags: ['cafes'], correct: true },
          { text: 'Speed', tags: ['street'] },
          { text: 'Price', tags: ['street'] },
          { text: 'Size', tags: ['classic'] },
        ],
      },
    ],
  },

  {
    id: 14,
    title: 'Curious Foodie',
    questions: [
      {
        id: 1401,
        question: 'Want something different?',
        options: [
          { text: 'Yes, definitely', tags: ['modern'], correct: true },
          { text: 'No, stick to safe', tags: ['classic'] },
          { text: 'Maybe', tags: ['cafes'] },
          { text: 'Not sure yet', tags: ['street'] },
        ],
      },
      {
        id: 1402,
        question: 'Cuisine?',
        options: [
          { text: 'Asian or fusion', tags: ['modern'], correct: true },
          { text: 'German classics', tags: ['classic'] },
          { text: 'Fast food', tags: ['street'] },
          { text: 'Bakery', tags: ['cafes'] },
        ],
      },
      {
        id: 1403,
        question: 'Mood?',
        options: [
          { text: 'Curious', tags: ['modern'], correct: true },
          { text: 'Hungry', tags: ['classic'] },
          { text: 'Tired', tags: ['cafes'] },
          { text: 'Calm', tags: ['cafes'] },
        ],
      },
      {
        id: 1404,
        question: 'Time?',
        options: [
          { text: 'Plenty', tags: ['modern'], correct: true },
          { text: 'Short', tags: ['street'] },
          { text: 'Medium', tags: ['classic'] },
          { text: 'Fast', tags: ['street'] },
        ],
      },
      {
        id: 1405,
        question: 'Goal?',
        options: [
          { text: 'Discover a new taste', tags: ['modern'], correct: true },
          { text: 'Eat fast', tags: ['street'] },
          { text: 'Relax', tags: ['cafes'] },
          { text: 'Save money', tags: ['street'] },
        ],
      },
      {
        id: 1406,
        question: 'Place?',
        options: [
          { text: 'Modern restaurant', tags: ['modern'], correct: true },
          { text: 'Street food', tags: ['street'] },
          { text: 'Café', tags: ['cafes'] },
          { text: 'Traditional tavern', tags: ['classic'] },
        ],
      },
      {
        id: 1407,
        question: 'Food style?',
        options: [
          { text: 'Creative dishes', tags: ['modern'], correct: true },
          { text: 'Heavy meals', tags: ['classic'] },
          { text: 'Snacks', tags: ['street'] },
          { text: 'Desserts', tags: ['cafes'] },
        ],
      },
      {
        id: 1408,
        question: 'Priority?',
        options: [
          { text: 'Experience', tags: ['modern'], correct: true },
          { text: 'Speed', tags: ['street'] },
          { text: 'Price', tags: ['street'] },
          { text: 'Comfort', tags: ['cafes'] },
        ],
      },
    ],
  },

  {
    id: 15,
    title: 'Light and Calm',
    questions: [
      {
        id: 1501,
        question: 'What do you want now?',
        options: [
          { text: 'Something light', tags: ['cafes'], correct: true },
          { text: 'Something heavy', tags: ['classic'] },
          { text: 'Something fast', tags: ['street'] },
          { text: 'Something exotic', tags: ['modern'] },
        ],
      },
      {
        id: 1502,
        question: 'Mood?',
        options: [
          { text: 'Relaxed', tags: ['cafes'], correct: true },
          { text: 'Hungry', tags: ['classic'] },
          { text: 'Busy', tags: ['street'] },
          { text: 'Curious', tags: ['modern'] },
        ],
      },
      {
        id: 1503,
        question: 'Best option?',
        options: [
          { text: 'Café or chill place', tags: ['cafes'], correct: true },
          { text: 'Street food', tags: ['street'] },
          { text: 'Restaurant', tags: ['classic'] },
          { text: 'Fine dining', tags: ['modern'] },
        ],
      },
      {
        id: 1504,
        question: 'Time?',
        options: [
          { text: 'No rush', tags: ['cafes'], correct: true },
          { text: 'Short', tags: ['street'] },
          { text: 'Medium', tags: ['classic'] },
          { text: 'Fast', tags: ['street'] },
        ],
      },
      {
        id: 1505,
        question: 'Why eat?',
        options: [
          { text: 'Relax and enjoy', tags: ['cafes'], correct: true },
          { text: 'Fill stomach', tags: ['classic'] },
          { text: 'Quick bite', tags: ['street'] },
          { text: 'Try new', tags: ['modern'] },
        ],
      },
      {
        id: 1506,
        question: 'Food type?',
        options: [
          { text: 'Light meals', tags: ['cafes'], correct: true },
          { text: 'Meat', tags: ['classic'] },
          { text: 'Fried', tags: ['street'] },
          { text: 'Fusion', tags: ['modern'] },
        ],
      },
      {
        id: 1507,
        question: 'Place vibe?',
        options: [
          { text: 'Cozy', tags: ['cafes'], correct: true },
          { text: 'Loud', tags: ['classic'] },
          { text: 'Busy', tags: ['street'] },
          { text: 'Fast', tags: ['street'] },
        ],
      },
      {
        id: 1508,
        question: 'Priority?',
        options: [
          { text: 'Comfort', tags: ['cafes'], correct: true },
          { text: 'Speed', tags: ['street'] },
          { text: 'Price', tags: ['street'] },
          { text: 'Size', tags: ['classic'] },
        ],
      },
    ],
  },
];

export const getLevelById = (id: number) =>
  QUIZ_LEVELS.find(l => l.id === id) ?? QUIZ_LEVELS[0];

export const QUIZ_QUESTIONS = QUIZ_LEVELS[0].questions;