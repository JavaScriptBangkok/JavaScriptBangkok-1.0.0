export const testMenu = {
  groups: [
    {
      title: 'Group A',
      choices: [
        {
          id: 'FoodStall',
          title: 'Choose 2 from our food stalls',
          availability: 200,
          info: '- A\n- B\n- C\n- D\n',
          customizations: [
            {
              id: 'Food',
              title: 'Food (อาหาร)',
              allowedChoices: 2,
              choices: [
                { id: 'A', title: 'Menu A', availability: 100 },
                { id: 'B', title: 'Menu B', availability: 2 },
                { id: 'C', title: 'Menu C', availability: 1 },
                { id: 'D', title: 'Menu D', availability: 0 },
              ],
            },
          ],
        },
      ],
    },
    {
      title: 'Group B',
      choices: [
        {
          id: 'RestaurantA',
          title: 'Restaurant A',
          availability: 42,
          info: '- E\n- F\n- G\n',
          customizations: [
            {
              id: 'Food',
              title: 'Food (อาหาร)',
              textLength: 'long',
              choices: [
                { id: 'E', title: 'Menu E' },
                { id: 'F', title: 'Menu F' },
                { id: 'G', title: 'Menu G' },
              ],
            },
            {
              id: 'Spice',
              title: 'Spice level (ความเผ็ด)',
              textLength: 'short',
              choices: [
                { id: 'L0', title: 'Level 0 (ระดับ 0)' },
                { id: 'L1', title: 'Level 1 (ระดับ 1)' },
                { id: 'L2', title: 'Level 2 (ระดับ 2)' },
                { id: 'L3', title: 'Level 3 (ระดับ 3)' },
              ],
            },
            {
              id: 'Drink',
              title: 'Drink (เครื่องดื่ม)',
              textLength: 'short',
              choices: [{ id: 'WTR', title: 'Drinking water (น้ำดื่ม)' }],
            },
          ],
        },
        {
          id: 'RestaurantB',
          title: 'Restaurant B',
          availability: 35,
          info: '- H\n- I\n- J\n',
          customizations: [
            {
              id: 'Food',
              title: 'Food (อาหาร)',
              textLength: 'long',
              choices: [
                { id: 'H', title: 'Menu H', availability: 2 },
                { id: 'I', title: 'Menu I', availability: 1 },
                { id: 'J', title: 'Menu J', availability: 0 },
              ],
            },
            {
              id: 'Drink',
              title: 'Drink (เครื่องดื่ม)',
              textLength: 'short',
              choices: [{ id: 'SOF', title: 'Soft drink' }],
            },
          ],
        },
        {
          id: 'RestaurantC',
          title: 'Restaurant C',
          availability: 1,
          info: '- K\n- L\n- M\n',
          customizations: [
            {
              id: 'Food',
              title: 'Food (อาหาร)',
              textLength: 'long',
              choices: [
                { id: 'K', title: 'Menu K' },
                { id: 'L', title: 'Menu L' },
                { id: 'M', title: 'Menu M' },
              ],
            },
            {
              id: 'Drink',
              title: 'Drink (เครื่องดื่ม)',
              textLength: 'short',
              choices: [{ id: 'SOF', title: 'Soft drink' }],
            },
          ],
        },
        {
          id: 'RestaurantD',
          title: 'Restaurant D',
          availability: 0,
          info: '- N\n- O\n',
          customizations: [
            {
              id: 'Food',
              title: 'Food (อาหาร)',
              textLength: 'long',
              choices: [
                { id: 'N', title: 'Menu N' },
                { id: 'O', title: 'Menu O' },
              ],
            },
            {
              id: 'Drink',
              title: 'Drink (เครื่องดื่ม)',
              textLength: 'short',
              choices: [{ id: 'SOF', title: 'Soft drink' }],
            },
          ],
        },
      ],
    },
  ],
}
