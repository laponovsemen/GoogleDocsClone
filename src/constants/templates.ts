
export type TemplateType = {
	id: string,
	label: string,
	imageUrl: string,
	initialContent: string
}

export const templates: TemplateType[] = [
	{
		id: 'blank',
		label: 'Blank Document',
		imageUrl: 'blank-document.svg',
		initialContent: ''
	},
	{
		id: 'software-proposal',
		label: 'Software developer proposal',
		imageUrl: 'software-proposal.svg',
		initialContent: `
			<h1>Software Developer Proposal</h1>
			<h2>Project Overview</h2>
			<p>Brief description of the proposed software development project.</p>

			<h2>Scope of Work</h2>
			<p>Detailed breakdown of project deliverables and requirements.</p>

			<h2>Timeline</h2>
			<p>Project milestones and delivery schedule.</p>

			<h2>Budget</h2>
			<p>Cost breakdown and payment terms.</p>
		`
	},
	{
		id: 'project-proposal',
		label: 'Project Proposal',
		imageUrl: 'project-proposal.svg',
		initialContent: `
			<h1>Project Proposal</h1>
			<h2>Introduction</h2>
			<p>Overview of the project, its purpose, and expected impact.</p>

			<h2>Objectives</h2>
			<p>Key goals and success criteria of the project.</p>

			<h2>Implementation Plan</h2>
			<p>Outline of the steps required to complete the project.</p>

			<h2>Expected Outcomes</h2>
			<p>What the project aims to achieve upon completion.</p>
		`
	},
	{
		id: 'business-letter',
		label: 'Business Letter',
		imageUrl: 'business-letter.svg',
		initialContent: `
			<h1>Business Letter</h1>
			<p>[Sender's Name]</p>
			<p>[Sender's Address]</p>
			<p>[Date]</p>

			<p>[Recipient's Name]</p>
			<p>[Recipient's Address]</p>

			<h2>Subject: [Subject of the Letter]</h2>
			<p>Dear [Recipient's Name],</p>
			<p>[Introduction paragraph]</p>
			<p>[Main content of the letter]</p>
			<p>[Closing remarks]</p>
			<p>Sincerely,</p>
			<p>[Your Name]</p>
		`
	},
	{
		id: 'resume',
		label: 'Resume',
		imageUrl: 'resume.svg',
		initialContent: `
			<h1>[Your Name]</h1>
			<p>[Your Contact Information]</p>

			<h2>Summary</h2>
			<p>Brief professional summary highlighting experience and skills.</p>

			<h2>Work Experience</h2>
			<p>[Job Title] at [Company Name] - [Years]</p>
			<p>Responsibilities and achievements.</p>

			<h2>Education</h2>
			<p>[Degree] from [Institution] - [Year]</p>

			<h2>Skills</h2>
			<ul>
				<li>Skill 1</li>
				<li>Skill 2</li>
				<li>Skill 3</li>
			</ul>
		`
	},
	{
		id: 'cover-letter',
		label: 'Cover Letter',
		imageUrl: 'cover-letter.svg',
		initialContent: `
			<h1>Cover Letter</h1>
			<p>[Your Name]</p>
			<p>[Your Address]</p>
			<p>[Your Email]</p>
			<p>[Date]</p>

			<p>[Hiring Manager's Name]</p>
			<p>[Company Name]</p>

			<h2>Subject: Application for [Job Title]</h2>
			<p>Dear [Hiring Manager's Name],</p>
			<p>[Introduction – Why you are writing]</p>
			<p>[Main body – Your skills and experience]</p>
			<p>[Conclusion – Express enthusiasm and next steps]</p>
			<p>Sincerely,</p>
			<p>[Your Name]</p>
		`
	},
	{
		id: 'letter',
		label: 'Letter',
		imageUrl: 'letter.svg',
		initialContent: `
			<h1>Letter</h1>
			<p>[Sender's Name]</p>
			<p>[Sender's Address]</p>
			<p>[Date]</p>

			<p>[Recipient's Name]</p>
			<p>[Recipient's Address]</p>

			<p>Dear [Recipient's Name],</p>
			<p>[Body of the letter]</p>
			<p>[Closing statement]</p>
			<p>Sincerely,</p>
			<p>[Your Name]</p>
		`
	}
];
