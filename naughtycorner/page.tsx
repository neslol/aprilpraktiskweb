import Lightbox from '../app/Lightbox';

export default function bleh() {
    return (
        <>
            <Lightbox
                images={[
                    "https://picsum.photos/200/300",
                    "https://picsum.photos/201/301",
                    "https://picsum.photos/202/302",
                    "https://picsum.photos/203/303",
                ]}
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            />
        </>
    )
}