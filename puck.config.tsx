import { ReactNode } from "react";
import type {Config} from "@puckeditor/core";
import ImagePicker from "@/app/editor/[[...puckPath]]/ImagePicker";

const ColorPicker = ({value, onChange}: { value: string; onChange: (val: string) => void }) => (
	<div style={{display: "flex", alignItems: "center", gap: "8px", padding: "4px 0"}}>
		<input
			type="color"
			value={value || "#ffffff"}
			onChange={(e) => onChange(e.target.value)}
			style={{
				border: "1px solid #ccc",
				borderRadius: "4px",
				width: "32px",
				height: "32px",
				padding: "2px",
				cursor: "pointer",
				background: "none"
			}}
		/>
		<span style={{fontSize: "14px", fontFamily: "monospace", color: "#666"}}>
      {value || "#ffffff"}
    </span>
	</div>
);

type Props = {
	Columns: {
		gap: number;
		horizontalArrangement: "start" | "center" | "end" | "space-between" | "space-around" | "space-evenly";
		verticalAlignment: "top" | "middle" | "bottom";
		content: ReactNode;
	};
	Text: {
		text: string;
		color: string;
	};
	Image: {
		src: string;
		alt: string;
	};
	Button: {
		text: string;
		link: string;
		variant: "primary" | "secondary" | "accent" | "custom";
		backgroundColor: string;
		textColor: string;
	};
};

const config: Config<Props> = {
	components: {
		Columns: {
			fields: {
				gap: {
					type: "number"
				},
				horizontalArrangement: {
					type: "select",
					options: [
						{label: "Start", value: "start"},
						{label: "Center", value: "center"},
						{label: "End", value: "end"},
						{label: "Space between", value: "space-between"},
						{label: "Space around", value: "space-around"},
						{label: "Space evenly", value: "space-evenly"},
					]
				},
				verticalAlignment: {
					type: "select",
					options: [
						{label: "top", value: "top"},
						{label: "middle", value: "middle"},
						{label: "bottom", value: "bottom"},
					]
				},
				content: { type: "slot" }
			},
			defaultProps: {
				gap: 6,
				horizontalArrangement: "start",
				verticalAlignment: "top",
				content: [],
			},
			render: ({gap, horizontalArrangement, verticalAlignment, content}) => (
				<div className={"flex"}
				          style={{gap: `${gap}rem`, justifyContent: horizontalArrangement, alignItems: verticalAlignment}}>
					{content}
				</div>
			),
		},
		Text: {
			fields: {
				text: {type: "textarea"},
				color: {
					type: "custom",
					render: ColorPicker,
				},
			},
			defaultProps: {
				text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
				color: "#000000",
			},
			render: ({text, color}) => (
				<p className={`text-lg leading-relaxed my-4`} style={{color}}>{text}</p>
			),
		},
		Image: {
			fields: {
				src: {
					type: "custom",
					render: ImagePicker,
				},
				alt: {type: "text"},
			},
			defaultProps: {
				src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
				alt: "Placeholder image",
			},
			render: ({src, alt}) => (
				<img src={src} alt={alt} className="block w-full h-auto rounded-lg shadow-md"/>
			),
		},
		Button: {
			fields: {
				text: {type: "text"},
				link: {type: "text"},
				variant: {
					type: "select",
					options: [
						{label: "Primary", value: "primary"},
						{label: "Secondary", value: "secondary"},
						{label: "Accent", value: "accent"},
						{label: "Custom", value: "custom"},
					],
				},
				backgroundColor: {
					type: "custom",
					render: ColorPicker,
				},
				textColor: {
					type: "custom",
					render: ColorPicker,
				},
			},
			defaultProps: {
				text: "Learn More",
				link: "#",
				variant: "primary",
				backgroundColor: "#2563eb",
				textColor: "#ffffff",
			},
			render: ({text, link, variant, backgroundColor, textColor}) => {
				const variantClasses = {
					primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-lg",
					secondary: "bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50",
					accent: "bg-[#D7CEB2] text-black hover:bg-[#c5ba9a]",
					custom: "",
				};

				const style = variant === "custom" ? {backgroundColor, color: textColor} : {};

				return (
					<div className="my-4">
						<a
							href={link}
							style={style}
							className={`inline-block px-8 py-3 rounded-full font-medium transition-all transform hover:scale-105 ${variantClasses[variant]}`}
						>
							{text}
						</a>
					</div>
				);
			},
		},
	},
};

export default config;