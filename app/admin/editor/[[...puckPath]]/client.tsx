"use client"
import {Puck, Data} from "@puckeditor/core";
import config from "@/puck.config";
import CustomLayout from "./CustomLayout";

export default function Client({path, data}: { path: string; data: Partial<Data> }) {
	return (
		<Puck config={config} data={data}>
			<CustomLayout path={path}/>
		</Puck>
	);
}
