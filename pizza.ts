import * as inquirer from 'inquirer';

interface Order {
  toBeDelivered: boolean;
  phone: string;
  size: string[];
  quantity: number;
  toppings: string;
  beverage: string;
  comments: string;
  prize: string;
}

export async function order() {
  console.log('Hi, welcome to Node Pizza');

  const questions: inquirer.Question[] = [
    {
      default: false,
      message: 'Is this for delivery?',
      name: 'toBeDelivered',
      type: 'confirm',
    },
    // {
    //   message: 'What\'s your phone number?',
    //   name: 'phone',
    //   type: 'input',
    //   validate: (value: string) => {
    //     const pass = value.match(/^([01]{1})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i);
    //     if (pass) {
    //       return true;
    //     }

    //     return 'Please enter a valid phone number';
    //   },
    // },
    {
      choices: ['Large', 'Medium', 'Small'],
      filter: (value: string) => {
        return value.toLowerCase();
      },
      message: 'What size do you need?',
      name: 'size',
      type: 'list',
    },
    {
      message: 'How many do you need?',
      name: 'quantity',
      type: 'input',
      validate: (value: string) => {
        const valid = !isNaN(parseFloat(value));
        return valid || 'Please enter a number';
      },
    },
    {
      choices: [
        {
          key: 'p',
          name: 'Pepperoni and cheese',
          value: 'PepperoniCheese',
        },
        {
          key: 'a',
          name: 'All dressed',
          value: 'alldressed',
        },
        {
          key: 'w',
          name: 'Hawaiian',
          value: 'hawaiian',
        },
      ],
      message: 'What about the toppings?',
      name: 'toppings',
      type: 'expand',
    },
    {
      choices: ['Pepsi', '7up', 'Coke'],
      message: 'You also get a free 2L beverage',
      name: 'beverage',
      type: 'rawlist',
    },
    {
      default: 'Nope, all good!',
      message: 'Any comments on your purchase experience?',
      name: 'comments',
      type: 'input',
    },
    {
      choices: ['cake', 'fries'],
      message: 'For leaving a comment, you get a freebie',
      name: 'prize',
      type: 'list',
      when: (answers: any) => {
        return answers.comments !== 'Nope, all good!';
      },
    },
  ];

  const answers = await inquirer.prompt(questions);
  return answers as Order;
}
