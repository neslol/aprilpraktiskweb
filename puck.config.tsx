import type {Config} from "@puckeditor/core";
import Accordion, {AccordionProps} from "@/app/Accordion";
import {Heading} from "@/app/Heading";
import {Hero} from "@/app/Hero";

type Props = {
	Heading: {};
	Accordion: AccordionProps;
	Hero: any;
};

const config: Config<Props> = {
	components: {
		Accordion: {
			fields: {
				title: {
					type: "text",
					label: "Title",
				},
				description: {
					type: "textarea",
					label: "Description",
				},
				bgColor: {
					type: "text",
					label: "Background color class",
				},
				textColor: {
					type: "text",
					label: "Text color class",
				},
				items: {
					type: "array",
					label: "Accordion items",
					arrayFields: {
						title: {
							type: "text",
							label: "Title",
						},
						heading: {
							type: "text",
							label: "Heading",
						},
						text: {
							type: "textarea",
							label: "Text",
						},
					}
				},
			},
			render: ({title, description, items = [], bgColor, textColor, puck}) => {
				const openInEditor = puck.isEditing;
				return (
					<Accordion
						title={title}
						description={description}
						items={items}
						openAll={openInEditor}
						bgColor={bgColor}
						textColor={textColor}
					/>
				);
			},
		},
		Heading: {
			render: () => {
				return (
					<Heading />
				);
			},
		},
		Hero: {
			fields: {
				title: {
					type: "text",
					label: "Title",
				},
				subtitle: {
					type: "textarea",
					label: "Subtitle",
				},
				bgHeroUrl: {
					type: "text",
					label: "Background image URL",
				},
				textColor: {
					type: "text",
					label: "Text color class",
				},
				buttonTextColor: {
					type: "text",
					label: "Button text color class",
				},
				items: {
					type: "array",
					label: "Hero buttons",
					arrayFields: {
						title: {
							type: "text",
							label: "Button title",
						},
						url: {
							type: "text",
							label: "Link URL",
						},
					},
				},
			},
			render: ({title, subtitle, bgHeroUrl, textColor, buttonTextColor, items = []}) => {
				return (
					<Hero
						title={title}
						subtitle={subtitle}
						bgHeroUrl={bgHeroUrl}
						textColor={textColor}
						buttonTextColor={buttonTextColor}
						items={items}
					/>
				);
			},
		},
	},
};

export default config;