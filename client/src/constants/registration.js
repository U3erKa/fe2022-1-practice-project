import styles from 'styles/registration.module.sass';

export const REGISTRATION_ARTICLES_LEFT = [
  {
    id: 0,
    header: 'Why should I use Squadhelp?',
    article:
      'You always have an option of hiring a consultant or coming up with the name yourself. ' +
      'However, Squadhelp builds great brands that succeed faster by connecting you with the most creative people across the globe. ' +
      'Most importantly, Squadhelp provides you with choice: you get to see ideas from dozens ' +
      '(in some cases, hundreds) of contestants before you select a winner. ' +
      'Typically, you would spend far less money with Squadhelp (our contests start at $199) than hiring an agency. ' +
      'Also, you will receive immediate results - most contests begin receiving submissions within minutes of starting.',
  },
  {
    id: 1,
    header: 'How is Squadhelp Different?',
    article:
      'Since 2011, we have been committed to disrupting the traditional agency model. ' +
      'Our platform offers much more than a typical crowdsourcing experience. ' +
      'From Machine Learning to Audience Testing to Comprehensive Trademark Validation, ' +
      'you receive best-in-class support for your branding projects. ' +
      'Breadth: Our Contest-Based Crowdsourcing approach allows you to receive an unmatched breadth ' +
      "of name ideas from dozens of unique, creative minds while working with the world's largest branding community. " +
      'Quality and Collaboration: Using an advanced Quality Scoring Algorithm, ' +
      'we ensure that you receive more ideas from our top-quality creatives, and we use ' +
      'Gamification best practices to encourage high-quality brainstorming and two-way communication throughout your contest. ' +
      'We don’t stop at ideation: Choose your name with confidence through our high-end validation services. ' +
      'Poll your target demographics to get unbiased feedback on your favorite names, ' +
      'and receive Trademark Risk and Linguistics Analysis Reports developed by a Licensed Trademark Attorney.',
  },
];

export const REGISTRATION_ARTICLES_RIGHT = [
  {
    id: 0,
    header: 'I’ve never used Squadhelp before. What should I expect?',
    article:
      'Most customers tell us that Squadhelp’s process is effective, easy, fast, and even fun. ' +
      'We constantly hear extremely positive feedback with respect to the breadth of ideas submitted to each contest, ' +
      'and many customers are surprised at how insightful working with dozens of creative individuals from across the globe can be.',
  },
  {
    id: 1,
    header: 'How much does it cost?',
    article:
      'Our naming competitions start at $199, and our logo design competitions start at $299. ' +
      'Also, there are three additional contest level that each offer more features and benefits. ' +
      'See our Pricing Page for details.',
  },
  {
    id: 2,
    header: 'Do you offer any discount for multiple contests?',
    article:
      'Yes! We have many contest bundles - our most popular being our Name, Tagline, and Logo bundle. ' +
      'Bundles allow you to purchase multiple contests at one time and save as much as from $75 - $400. ' +
      'You can learn more about our bundle options on our Pricing Page.',
  },
  {
    id: 3,
    header: 'Will you help me validate my name?',
    article:
      'Yes! We believe that validating and securing your name is a critical part of your branding process. ' +
      'Squadhelp offers domain checks, Trademark support, linguistics analysis, ' +
      'and professional audience testing to help you choose your name with confidence. ' +
      'We even have special prices for Trademark filing for our customers.',
  },
  {
    id: 4,
    header: 'I have other questions! How can I get in touch with Squadhelp?',
    article:
      /** @type {import('components/TextEntry/TextEntry').TextEntryList} */ ([
        { id: 0, text: 'Check out our ', type: 'plain' },
        { id: 1, text: 'FAQs', type: 'span', className: styles.orangeSpan },
        { id: 2, text: ' or send us a ', type: 'plain' },
        { id: 3, text: 'message', type: 'span', className: styles.orangeSpan },
        {
          id: 4,
          text: '. For assistance with launching a contest, you can also call us at (877) 355-3585 or schedule a ',
          type: 'plain',
        },
        {
          id: 5,
          text: 'Branding Consultation',
          type: 'span',
          className: styles.orangeSpan,
        },
      ]),
  },
];
