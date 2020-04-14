import React, { FC } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface LazyImageProps {
	alt: string;
	image: any;
	className: string;
}

const LazyImage: FC<LazyImageProps> = props => {
	return (
		<LazyLoadImage
			alt={props.alt}
			src={props.image} // use normal <img> attributes as props
			effect="blur"
			className={props.className}
		/>
	);
};

export default LazyImage;
