import type {Config} from "@puckeditor/core";
import Accordion, {AccordionProps} from "@/app/Accordion";
import {Heading} from "@/app/Heading";
import {Hero} from "@/app/Hero";

type Props = {
	Accordion: AccordionProps;
	HeroPreview: {
		isPastHero: boolean;
	};
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
		HeroPreview: {
			render: () => {
				return (
					<>
						<Heading />
						<Hero/>
					</>
				);
			},
		},
	},
};

export default config;