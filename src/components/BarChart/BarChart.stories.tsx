import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { Network } from '@dcl/schemas'
import { BarChart } from './BarChart'

const smallValuesDataSet = {
  '1': 1,
  '2': 788,
  '3': 232,
  '4': 518,
  '5': 55,
  '6': 160,
  '7': 23,
  '8': 79,
  '9': 144,
  '10': 55,
  '11': 18,
  '12': 89,
  '13': 18,
  '14': 23,
  '15': 22,
  '16': 44,
  '17': 3,
  '18': 15,
  '19': 12,
  '20': 27,
  '21': 5,
  '22': 15,
  '23': 8,
  '24': 17,
  '25': 19,
  '26': 9,
  '27': 6,
  '28': 11,
  '29': 3,
  '30': 16,
  '31': 3,
  '32': 18,
  '33': 3,
  '34': 5,
  '35': 6,
  '36': 9,
  '37': 2,
  '38': 4,
  '39': 3,
  '40': 2,
  '41': 1,
  '42': 3,
  '44': 1,
  '45': 3,
  '48': 3,
  '49': 1,
  '50': 3,
  '51': 1,
  '52': 3,
  '54': 1,
  '55': 5,
  '56': 2,
  '57': 1,
  '58': 1,
  '59': 3,
  '61': 2,
  '62': 1,
  '64': 7,
  '65': 2,
  '68': 1,
  '72': 2,
  '75': 1,
  '77': 1,
  '78': 2,
  '80': 3,
  '81': 1,
  '82': 1,
  '84': 1,
  '85': 1,
  '89': 1,
  '90': 1,
  '94': 1,
  '99': 1,
  '100': 4,
  '105': 1,
  '106': 1,
  '110': 1,
  '116': 1,
  '119': 1,
  '125': 1,
  '131': 1,
  '142': 1,
  '143': 2,
  '144': 1,
  '149': 2,
  '150': 1,
  '151': 1,
  '162': 1,
  '163': 1,
  '167': 1,
  '169': 1,
  '170': 2,
  '172': 2,
  '196': 1,
  '216': 1,
  '237': 1,
  '243': 1,
  '253': 1,
  '255': 1,
  '260': 1,
  '284': 1,
  '289': 1,
  '301': 1,
  '302': 1,
  '366': 1,
  '380': 1,
  '396': 1,
  '400': 9,
  '406': 1,
  '417': 1,
  '429': 1,
  '480': 1,
  '546': 1,
  '557': 1,
  '568': 1,
  '581': 1,
  '635': 1,
  '701': 1,
  '730': 1,
  '743': 1,
  '799': 2,
  '1056': 1,
  '1086': 1,
  '1110': 1,
  '1230': 1,
  '1244': 1,
  '1451': 1,
  '1454': 1,
  '1575': 1,
  '2001': 1,
  '4782': 1,
  '10005': 1
}

const data = {
  '3499.0': 1,
  '3685.0': 1,
  '3729.0': 1,
  '3849.0': 1,
  '3950.0': 1,
  '3988.0': 1,
  '4000.0': 1,
  '4099.0': 1,
  '4150.0': 1,
  '4199.0': 1,
  '4288.0': 1,
  '4299.0': 1,
  '4420.0': 1,
  '4444.0': 1,
  '4500.0': 1,
  '4599.0': 1,
  '4650.0': 1,
  '4690.0': 1,
  '4699.0': 1,
  '4700.0': 2,
  '4725.0': 1,
  '4744.0': 1,
  '4799.0': 1,
  '4850.0': 1,
  '4869.0': 1,
  '4888.0': 2,
  '4899.0': 1,
  '4900.0': 1,
  '4950.0': 1,
  '4969.0': 1,
  '4990.0': 1,
  '4998.0': 1,
  '4999.0': 2,
  '5069.0': 1,
  '5099.0': 1,
  '5169.0': 1,
  '5199.0': 1,
  '5200.0': 2,
  '5300.0': 1,
  '5420.0': 1,
  '5479.0': 1,
  '5485.0': 1,
  '5488.0': 1,
  '5678.0': 1,
  '5688.0': 1,
  '5869.0': 1,
  '5888.0': 2,
  '5899.0': 1,
  '5969.0': 1,
  '5985.0': 2,
  '5988.0': 1,
  '6000.0': 2,
  '6100.0': 1,
  '6200.0': 2,
  '6250.0': 1,
  '6399.0': 1,
  '6488.0': 1,
  '6500.0': 1,
  '6666.0': 1,
  '6688.0': 2,
  '6888.0': 1,
  '6900.0': 1,
  '6920.0': 1,
  '6969.0': 3,
  '6999.0': 5,
  '7000.0': 2,
  '7199.0': 1,
  '7298.0': 1,
  '7369.0': 1,
  '7420.0': 2,
  '7500.0': 1,
  '7769.0': 1,
  '7777.0': 3,
  '7788.0': 1,
  '7980.0': 1,
  '7988.0': 2,
  '7997.0': 1,
  '7999.0': 1,
  '8000.0': 9,
  '8200.0': 1,
  '8520.0': 1,
  '8888.0': 6,
  '8900.0': 2,
  '8990.0': 1,
  '9000.0': 2,
  '9350.0': 1,
  '9500.0': 2,
  '9888.0': 1,
  '9900.0': 1,
  '9980.0': 1,
  '9999.0': 8,
  '10000.0': 15,
  '10350.0': 1,
  '10788.0': 1,
  '10888.0': 1,
  '10988.0': 1,
  '11000.0': 4,
  '11200.0': 1,
  '11420.0': 1,
  '11500.0': 1,
  '11888.0': 1,
  '12000.0': 6,
  '12345.0': 1,
  '12420.0': 1,
  '12500.0': 5,
  '12888.0': 2,
  '13000.0': 1,
  '13123.0': 1,
  '13579.0': 1,
  '13888.0': 5,
  '13950.0': 1,
  '14000.0': 1,
  '14420.0': 1,
  '14888.0': 1,
  '15000.0': 11,
  '15888.0': 1,
  '16000.0': 3,
  '17500.0': 2,
  '17999.0': 1,
  '18000.0': 2,
  '18020.0': 1,
  '18900.0': 1,
  '19000.0': 1,
  '19200.0': 1,
  '19500.0': 2,
  '19888.0': 1,
  '19900.0': 1,
  '19999.0': 2,
  '20000.0': 10,
  '21000.0': 2,
  '22000.0': 2,
  '22222.0': 1,
  '23000.0': 3,
  '23432.0': 1,
  '24899.0': 1,
  '24999.0': 3,
  '25000.0': 16,
  '26500.0': 1,
  '26800.0': 1,
  '27500.0': 1,
  '28900.0': 1,
  '29000.0': 1,
  '29800.0': 1,
  '29900.0': 1,
  '30000.0': 9,
  '31221.0': 1,
  '32000.0': 1,
  '32123.0': 1,
  '33000.0': 3,
  '34000.0': 3,
  '34500.0': 1,
  '35000.0': 2,
  '40000.0': 4,
  '42999.0': 2,
  '44000.0': 1,
  '45000.0': 2,
  '47777.0': 1,
  '50000.0': 12,
  '58000.0': 1,
  '59159.0': 1,
  '59180.0': 1,
  '59185.0': 1,
  '59195.0': 1,
  '59999.0': 1,
  '60000.0': 2,
  '65000.0': 1,
  '69169.0': 1,
  '75000.0': 1,
  '80000.0': 3,
  '88888.0': 2,
  '90210.0': 1,
  '100000.0': 11,
  '102102.0': 1,
  '120000.0': 3,
  '121000.0': 1,
  '135000.0': 1,
  '138888.0': 1,
  '150000.0': 1,
  '177777.0': 1,
  '180000.0': 1,
  '199199.0': 2,
  '199998.0': 1,
  '200000.0': 4,
  '250000.0': 1,
  '399399.0': 1,
  '499000.0': 1,
  '500000.0': 2,
  '588888.0': 1,
  '599500.0': 1,
  '750000.0': 1,
  '777777.0': 1,
  '800000.0': 1,
  '831300.0': 1,
  '998000.0': 1,
  '1000000.0': 3,
  '1888888.0': 1,
  '2000000.0': 2,
  '5888888.0': 1,
  '6969696.0': 1,
  '10000000.0': 1
}

const onChange = (values) => {
  console.log('values:', values)
}

storiesOf('BarChart ', module)
  .add('Loading data', () => (
    <BarChart
      width={250}
      loading
      max={''}
      min={''}
      network={Network.ETHEREUM}
      onChange={onChange}
    />
  ))
  .add('No upperBound', () => (
    <BarChart
      width={250}
      data={data}
      max={''}
      min={''}
      network={Network.ETHEREUM}
      onChange={onChange}
    />
  ))
  .add('With a 5M upperBound', () => (
    <BarChart
      width={250}
      data={data}
      max={''}
      min={''}
      upperBound={5000000}
      network={Network.ETHEREUM}
      onChange={onChange}
    />
  ))
  .add('With minPrice and maxPrice defined', () => (
    <BarChart
      width={250}
      data={data}
      min={'7000'}
      max={'2000000'}
      network={Network.ETHEREUM}
      onChange={onChange}
    />
  ))
  .add('with MANA currency', () => (
    <BarChart
      isMana
      width={250}
      data={data}
      min={'7000'}
      max={'2000000'}
      network={Network.ETHEREUM}
      onChange={onChange}
    />
  ))
  .add('with no decimals for small ranges', () => (
    <BarChart
      isMana
      rangeDecimals={0}
      width={250}
      data={smallValuesDataSet}
      min={'7000'}
      max={'2000000'}
      network={Network.ETHEREUM}
      onChange={onChange}
    />
  ))
