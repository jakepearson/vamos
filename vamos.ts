import * as commander from 'commander';

import * as pizza from './pizza';

commander
  .version('0.0.1')
  .command('order', 'Order a pizza')
  .action(() => {
    pizza.order().then(order => {
      console.log(JSON.stringify(order, null, 2));
    });
  });

commander.parse(process.argv);