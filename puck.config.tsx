import type {Config} from "@puckeditor/core";
import Accordion, {AccordionProps} from "@/app/Accordion";

type Props = {
	Accordion: AccordionProps;
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
					},
					getItemSummary: (item, index) => item.title || `Accordion item ${(index || 0) + 1}`,
				},
			},
			render: ({title, description, items = [], puck}) => {
				const openInEditor = puck.isEditing;
				return (<Accordion title={title} description={description} items={items} openAll={openInEditor}/>);
			},
		},
	},
};

export default config;