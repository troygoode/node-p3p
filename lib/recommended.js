// CP="NOI ADM DEV PSAi OUR OTRo STP IND COM NAV DEM"
module.exports = {
  access: 'nonident',
  purpose: {
    admin: true,
    develop: true,
    'pseudo-analysis': 'opt-in'
  },
  categories: {
    computer: true,
    navigation: true,
    demographic: true
  },
  recipient: {
    ours: true,
    'other-recipient': 'opt-out'
  },
  retention: {
    'stated-purpose': true,
    indefinitely: true
  }
};
