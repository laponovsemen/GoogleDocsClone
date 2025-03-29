import React from 'react';


interface AuthProps {
	children: React.ReactNode;
}

const Auth = ({children}: AuthProps) => {
	return (
		<div className={"flex flex-col gap-y-4"}>
			<nav className={"w-full bg-red-500"}>Auth Navbar </nav>
			{children}
		</div>
	);
};

export default Auth;
