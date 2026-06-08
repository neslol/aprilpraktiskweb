import type {Config} from "@puckeditor/core";
import Accordion, {AccordionProps} from "@/app/Accordion";
import {Heading} from "@/app/Heading";
import {Hero, HeroProps} from "@/app/Hero";
import MainSec, { MainSecProps } from "@/app/MainSec";
import CtaSec, { CtaSecProps } from "@/app/CtaSec";
import BgSec, { BgSecProps } from "@/app/BgSec";

type Props = {
	Heading: {};
	Accordion: AccordionProps;
	Hero: HeroProps;
	MainSec: MainSecProps;
	CtaSec: CtaSecProps;
	BgSec: BgSecProps;
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
		MainSec: {
			fields: {
				title: {
					type: "text",
					label: "Title",
				},
				text: {
					type: "textarea",
					label: "Text",
				},
				imageUrl: {
					type: "text",
					label: "Image URL",
				},
				imageAlt: {
					type: "text",
					label: "Image Alt Text",
				},
				bgColor: {
					type: "text",
					label: "Background color class",
				},
				textColor: {
					type: "text",
					label: "Text color class",
				},
			},
			render: ({title, text, imageUrl, imageAlt, bgColor, textColor}) => {
				return (
					<MainSec
						title={title}
						text={text}
						imageUrl={imageUrl}
						imageAlt={imageAlt}
						bgColor={bgColor}
						textColor={textColor}
					/>
				);
			},
		},
		CtaSec: {
			fields: {
				title: {
					type: "text",
					label: "Title",
				},
				points: {
					type: "array",
					label: "Points",
					arrayFields: {
						point: {
							type: "text",
							label: "Point",
						},
					}
				},
				buttonText: {
					type: "text",
					label: "Button Text",
				},
				buttonColor: {
					type: "text",
					label: "Button Color Class",
				},
				bgColor: {
					type: "text",
					label: "Background Color Class",
				},
				textColor: {
					type: "text",
					label: "Text Color Class",
				},
				imageUrl: {
					type: "text",
					label: "Image URL",
				},
			},
			render: ({title, points, buttonText, buttonColor, bgColor, textColor, imageUrl}) => {
				return (
					<CtaSec
						title={title}
						points={points}
						buttonText={buttonText}
						buttonColor={buttonColor}
						bgColor={bgColor}
						textColor={textColor}
						imageUrl={imageUrl}
					/>
				);
			},
		},
		BgSec: {
			fields: {
				bgImageUrl: {
					type: "text",
					label: "Image URL",
				},
				title: {
					type: "text",
					label: "Title",
				},
				text: {
					type: "textarea",
					label: "Text",
				},
				textColor: {
					type: "text",
					label: "Text color class",
				},
			},
			render: ({bgImageUrl,title, text, textColor}) => {
				return (
					<BgSec
						bgImageUrl={bgImageUrl}
						title={title}
						text={text}	
						textColor={textColor}
					/>
				);
			},
		},
	},
};

export default config;