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
	TestBlock: {
		text: string;
	}
};

const config: Config<Props> = {
	components: {
		TestBlock: {
			fields: {
				text: {
					type: "text",
					label: "Text",
				}
			},
			render: ({text = " "}) => {
				return (
					<div className={"bg-gray-300 w-full p-6"}>
						{text}
					</div>
				);
			}
		},
	},
};

export default config;