"use client"
import {Puck, Data} from "@puckeditor/core";
import config from "@/puck.config";

export default function Client({ path, data }: { path: string; data: Partial<Data> }) {
	return <Puck 
		config={config} 
		data={data}
		onPublish={async (data) => {}} 
	/>;
}