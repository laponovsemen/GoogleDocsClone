import React from 'react';
import {Button} from "@/components/ui/button";

const Home = () => {
	return (
		<div className={"flex justify-center min-h-screen items-center "}>
          <p>Hello world</p>
			<Button className="" variant={'destructive'}>
				Click me
			</Button>
		</div>
	);
};

export default Home;
