import React from 'react';
import { UserButton, OrganizationSwitcher } from "@clerk/clerk-react";

export const UserPersonalInfo = () => {
	return (<>
		<div className='gap-3 flex items-cente pl-6'>
			<OrganizationSwitcher
				afterCreateOrganizationUrl={'/'}
				afterSelectOrganizationUrl={'/'}
				afterLeaveOrganizationUrl={'/'}
				afterSelectPersonalUrl={'/'}
			/>
			<UserButton />
		</div>
	</>

	);
};

