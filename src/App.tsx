import React from "react";
import { ThemeProvider } from "styled-components";
import { TransactionsProvider } from "./contexts/transaction";
import { Home } from "./pages/Home";
import { GlobalTheme } from "./styles/Global";
import { defaultTheme } from "./styles/themes/default";

export function App() {
	return (
		<ThemeProvider theme={defaultTheme}>
			<GlobalTheme />

			<TransactionsProvider>
				<Home />
			</TransactionsProvider>
		</ThemeProvider>
	);
}
