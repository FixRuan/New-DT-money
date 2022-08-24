import React from "react";
import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";

import logoimg from "../../assets/Logo.svg";

import * as Dialog from "@radix-ui/react-dialog";
import { NewTransactionModal } from "../NewTransactionModal";


export function Header() {
	return (
		<HeaderContainer>
			<HeaderContent>
				<img src={logoimg} alt="" />

				<Dialog.Root>
					<Dialog.Trigger asChild>
						<NewTransactionButton>Nova transação</NewTransactionButton>
					</Dialog.Trigger>

					<NewTransactionModal />
				</Dialog.Root>
			</HeaderContent>
		</HeaderContainer>
	);
}
