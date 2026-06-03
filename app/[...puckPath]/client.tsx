"use client"
import {Data, Render} from "@puckeditor/core";
import config from "@/puck.config";

export default function Client({ path, data }: { path: string; data: Partial<Data> }) {
	return <Render
		config={config} 
		data={data}
	/>;
}