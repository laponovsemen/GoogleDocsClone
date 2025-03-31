import React from 'react';
import Link from 'next/link';
import Image from 'next/image'
import {SearchInput} from "@/components/features/home/search-input/search-input";
import { Logout } from './logout/logout';

export const Navbar = () => {
	return (
		<nav className={'flex items-center justify-between h-full w-full'}>
			<div className={'flex gap-3 items-center shrink-0 pr-6'}>
				<Link href={'/'}>
					<Image
						src={'/logo.svg'}
						alt={'Logo'}
						width={36}
						height={36}
					/>
				</Link>
				<h3 className={'texl-xl'}>Docs</h3>
			</div>
			<SearchInput />
			<Logout />
		</nav>
	);
};

