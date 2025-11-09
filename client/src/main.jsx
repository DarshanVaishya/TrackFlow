import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'

import { Button, HStack } from "@chakra-ui/react"

const Demo = () => {
	return (
		<HStack>
			<Button>Click me</Button>
			<Button>Click me</Button>
		</HStack>
	)
}

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<ChakraProvider value={defaultSystem}>
			<Demo />
		</ChakraProvider>
	</StrictMode>,
)
