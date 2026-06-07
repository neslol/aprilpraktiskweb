import type {Config} from "@puckeditor/core";
import Accordion, {AccordionProps} from "@/app/Accordion";
import {Heading, HeadingProps} from "@/app/Heading";
import {Hero, HeroProps} from "@/app/Hero";
import BgSec, {BgSecProps} from "@/app/BgSec";
import Button, {ButtonProps} from "@/app/Button";
import CtaSec, {CtaSecProps} from "@/app/CtaSec";
import Footer, {FooterProps} from "@/app/Footer";
import Lightbox, {LightboxProps} from "@/app/Lightbox";
import MainSec, {MainSecProps} from "@/app/MainSec";

type Props = {
	Paragraph: {
		text: string;
	},
};

const config: Config<Props> = {
	components: {
		Row: {
			render: () => {
				return (
					<div className={"bg-gray-300 w-full p-6"}>
						<p>Row content</p>
					</div>
				);
			}
		},
		Paragraph: {
			fields: {
				text: {
					type: "text",
					label: "Text",
					placeholder: "Enter paragraph text",
				}
			},
			render: ({text}) => {
				return (
					<p className={"bg-gray-300 w-full p-6"}>{text}</p>
				);
			}
		},
	},
};

export default config;