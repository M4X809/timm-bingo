/*
 * File: App.tsx
 * Project: timm-bingo
 * File Created: 27.08.2024, 23:08:56
 * 
 * Last Modified: 28.08.2024, 11:08:22
 * Modified By: MAX809
 */


import { Box, Center, Grid, Text } from '@mantine/core'
import { useEffect } from 'react'
// import './App.css'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface BingoState {
  currentGrid: gridElement[]
  setCurrentGrid: (grid: gridElement[]) => void
  toggleElement: (index: number) => void

  threeInARow: boolean
  checkThreeInARow: (grid: gridElement[]) => boolean
}

interface gridElement {
  title: string,
  checked: boolean
}

const getRandomValues = (arr: string[]): { title: string; checked: boolean }[] => {
  if (arr.length <= 9) {
    throw new Error("Array length must be greater than 9");
  }

  // Shuffle the array using the Fisher-Yates algorithm
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
  }

  // Create an array of 9 random values as objects
  const result = arr.slice(0, 9).map(title => ({
    title,
    checked: false, // Default value for 'checked'
  }));

  return result;
};

const checkThreeInARow = (grid: gridElement[]): boolean => {
  // Ensure the grid length is 9 to form a 3x3 grid
  if (grid.length !== 9) {
    throw new Error("Grid must have exactly 9 cells");
  }

  // Convert the flat array into a 2D array for easier checking
  const grid2D = [
    [grid[0], grid[1], grid[2]],
    [grid[3], grid[4], grid[5]],
    [grid[6], grid[7], grid[8]],
  ];

  // Check rows
  for (const row of grid2D) {
    if (row.every(cell => cell.checked)) {
      return true;
    }
  }

  // Check columns
  for (let col = 0; col < 3; col++) {
    if (grid2D[0][col].checked && grid2D[1][col].checked && grid2D[2][col].checked) {
      return true;
    }
  }

  // Check diagonals
  if (
    (grid2D[0][0].checked && grid2D[1][1].checked && grid2D[2][2].checked) || // Top-left to bottom-right diagonal
    (grid2D[0][2].checked && grid2D[1][1].checked && grid2D[2][0].checked)    // Top-right to bottom-left diagonal
  ) {
    return true;
  }

  // If no three in a row found, return false
  return false;
};


const useBingoStore = create<BingoState>()(
  persist(
    (set, get) => ({
      currentGrid: [],
      setCurrentGrid: (grid: gridElement[]) => set({ currentGrid: grid }),
      toggleElement: (index: number) => set({ currentGrid: get().currentGrid.map((el, i) => (i === index ? { ...el, checked: !el.checked } : el)) }),
      threeInARow: false,
      checkThreeInARow: (grid: gridElement[]) => {
        const result = checkThreeInARow(grid)
        set({ threeInARow: result })
        return result
      },

    }),
    {
      name: 'bingo-storage', // name of item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default the 'localStorage' is used
      partialize: (state) => ({ currentGrid: state.currentGrid, threeInARow: state.threeInARow }),
    },
  ),
)





const BingoGrid = () => {
  const data: string[] = [
    "Ich habe Essen",
    "Ich habe ein neues Magic Deck",
    "Bin 'Kurz' Weg",
    "Neue Mangas",
    "Wird gerufen => JAAAA",
    "Garten Arbeit",
    "Nach OLB",
    "Redet und nicht entmutet",
    "Meine Grafik karte macht Probleme",
    "Vanguard Probleme",
    "Neue Würfel",
    "Ich mache ein neues Magic Deck",
    "DND Stuff",
    "Mein Eistee ist leer / fast leer",
    "Irgendwas mit TFT",
  ]

  const currentGrid = useBingoStore((state) => state.currentGrid)
  const setCurrentGrid = useBingoStore((state) => state.setCurrentGrid)
  const toggleElement = useBingoStore((state) => state.toggleElement)

  const checkThreeInARow = useBingoStore((state) => state.checkThreeInARow)
  const threeInARow = useBingoStore((state) => state.threeInARow)


  useEffect(() => {
    if (Object.keys(currentGrid).length < 9) {
      const gData = getRandomValues(data) as unknown as gridElement[]
      console.log(gData)
      setCurrentGrid(gData)
    }

    if (Object.keys(currentGrid).length === 9) {
      checkThreeInARow(currentGrid)
    }


  }, [currentGrid, setCurrentGrid, checkThreeInARow])

  // console.log(currentGrid)



  // for (const [key, value] of Object.entries(currentGrid)) {
  //   console.log(key, value)
  // }


  const cols = currentGrid.map((data, index) => (
    <Grid.Col span={4} key={data.title}

      onClick={() => toggleElement(index)}
      style={{
        cursor: 'pointer',
      }}
    >
      <Center>
        <Box
          style={(theme) => ({
            userSelect: 'none',
            height: '100%',
            width: '100%', // Ensure the box is responsive
            aspectRatio: '1 / 1', // This maintains a square shape
            backgroundColor: data.checked ? theme.colors.blue[6] : theme.colors.gray[8],
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: theme.white,
            borderRadius: theme.radius.sm,
            textAlign: 'center',
          })}
        >
          <Text p={15}>
            {data.title.trim()}
          </Text>
        </Box>
      </Center>
    </Grid.Col>
  ))



  return (

    <Grid gutter="sm" h={"60vh"} w={"60vw"} pt={50}>
      {cols}
    </Grid>

  )


}



function App() {

  // const threeInARow = useBingoStore((state) => state.threeInARow)

  return (
    <>

      <Center >

        <BingoGrid />
      </Center>
    </>
  )
}

export default App
