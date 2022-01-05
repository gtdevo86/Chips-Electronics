const filters = [
  [
    'Processor',
    [
      ['Brand', ['Intel', 'AMD']],
      ['CPU Socket Type', ['LGA1200', 'LGA1700', 'AM4']],

      [
        'Core Name',
        ['Rocket Lake', 'Alder Lake', 'Matisse(Zen 2)', 'Vermeer(Zen 3)'],
      ],
      ['Cores', ['6', '8', '10', '12', '16', '6+4', '8+4']],
      [
        'Series',
        ['Core i5', 'Core i7', 'Core i9', 'Ryzen 5', 'Ryzen 7', 'Ryzen 9'],
      ],
    ],
  ],
  [
    'Memory',
    [
      ['Brand', ['G.Skill', 'Crucial']],
      ['Capacity', ['8GB (2 x 4GB)', '16GB (2 x 8GB)', '32GB (2 x 16GB)']],

      ['Device', ['Desktop', 'Laptop']],
      ['Series', ['Ripjaws V', 'Crucial Ballistix', 'Trident Z']],
      ['speed', ['2800', '3000', '3200', '3400', '3600', '3800', '4000']],
      [
        'Type',
        ['288-Pin DDR4 SDRAM', '288-Pin DDR5 SDRAM', '260-Pin DDR4 SO-DIMM'],
      ],
    ],
  ],
  [
    'Motherboards',
    [
      ['Brand', ['ASUS', 'MSI', 'GIGABYTE']],
      ['CPU Socket Type', ['LGA1200', 'LGA1700', 'AM4']],
      ['Chipset', ['X570', 'B550', 'Z690 ']],
      ['Form Factor', ['ATX', 'Mini-ATX', 'Mini-ITX']],
      ['Supported Cpu', ['Intel', 'AMD']],
    ],
  ],
  [
    'Video Cards',
    [
      ['Brand', ['EVGA', 'MSI', 'GIGABYTE']],
      ['Boost Clock', ['1710 MHz', '1800 MHz', '1905 MHz']],

      ['Chipset Manufacturer:', ['AMD', 'Nvidia']],
      [
        'Memory Interface:',
        ['128-Bit', '192-Bit', '256-Bit', '320-Bit', '384-Bit'],
      ],
      [
        'Series',
        ['GEFORCE RTX 20', 'GEFORCE RTX 30', 'Radeon RX 5000', 'Radeon RX 6000 '],
      ],
      ['Vram', ['8GB', '10GB', '12GB', '16GB', '24GB']],
    ],
  ],
  [
    'Storage',
    [
      ['Brand', ['SAMSUNG', 'Intel', 'Crucial']],
      ['Device Type', ['SSD', 'HDD']],

      ['Form Factor', ['M.2 2242', 'M.2 2280', '2.5"', '3.5"']],
      [
        'Interface',
        [
          'PCI-Express Gen 3.0 x4',
          'PCI-Express Gen 4.0 x4',
          'mSATA',
          'SATA 3.0Gb/s',
          'SATA 6.0Gb/s',
        ],
      ],
      [
        'Read Speed',
        [
          '7000 MB/s',
          '6500 MB/s',
          '6000 MB/s',
          '5000 MB/s',
          '4000 MB/s',
          '3000 MB/s',
        ],
      ],
    ],
  ],
]

export default filters
