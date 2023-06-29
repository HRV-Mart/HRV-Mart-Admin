import Review from "@/components/review";
import { logError, logMessage } from "@/service/logging/logging";
import { deleteRequest, getQueryFromURL, getRequest, postRequest, putRequest } from "@/service/network/network";
import styles from "@/styles/Product.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";

export default function ProductPage({ product, token, reviews, nextPage, size}) {
    const [imageIndex, setImageIndex] = useState(0);
    const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        isProductLiked();
    }, [0])
    
    return <div className={styles.main}>
        <div className={styles.imageSection}>
            <img
                className={styles.image}
                src={product.images[imageIndex]}
                alt={product.name}
            />
            <div className={styles.imageIndicatorContainer}>
                <button
                    onClick={() => decrementImageIndex()}
                    className={styles.imageIndicator}
                >
                    ◄
                </button>
                <div className={styles.textIndicator}>
                    {imageIndex + 1}/{product.images.length}
                </div>
                <button
                    onClick={() => incrementImageIndex()}
                    className={styles.imageIndicator}
                >
                    ►
                </button>
            </div>
        </div>
        <hr className={styles.vertical_divider} />
        <div className={styles.rightContainer}>
            <div className={styles.upperContainer}>
                <div className={styles.details}>
                    <div className={styles.title}>
                        {product.name}
                    </div>
                    <div className={styles.descriptionContainer}>
                        <div className={styles.descriptionTitle}>
                            Description:
                        </div>
                        <div className={styles.description}>
                            {product.description}
                        </div>
                    </div>
                    <div className={styles.descriptionContainer}>
                        <div className={styles.descriptionTitle}>
                            Price:
                        </div>
                        <div className={styles.description}>
                            ₹ {product.price}
                        </div>
                    </div>
                    {
                        token ? <div className={styles.likeCartContainer}>
                            <div className={styles.likeContainer} onClick={changeLike}>
                                {
                                    isLike ?
                                        <AiFillHeart
                                            fill={"red"} /> :
                                        <AiFillHeart />
                                }
                            </div>
                            <div className={styles.cartContainer}>
                                {cartHolder()}
                            </div>
                        </div> :
                            <></>
                    }
                    <hr className={styles.horizontal_divider} />
                </div>
            </div>
            <div className={styles.lowerContainer}>
                <div className={styles.reviews}>
                    {
                        reviews.map((review, index) => {
                            return <Review review={review.review} user={review.user} key={index} />
                        })
                    }
                </div>
                {nextPage && nextPage !== "null" ?
                    <Link className={styles.loadReviews} href={`/product/${product.id}?page=${nextPage}&size=${size}`}>
                        Next Page
                    </Link>
                    : <></>
                }
            </div>
        </div>
    </div>

    function incrementImageIndex() {
        const totalImageSize = product.images.length;
        if (imageIndex >= totalImageSize - 1) {
            setImageIndex(0)
        }
        else {
            setImageIndex(imageIndex + 1)
        }
    }
    function decrementImageIndex() {
        const totalImageSize = product.images.length;
        if (imageIndex <= 0) {
            setImageIndex(totalImageSize - 1)
        }
        else {
            setImageIndex(imageIndex - 1)
        }
    }
}
export async function getServerSideProps(content) {
    var query = getQueryFromURL(content.resolvedUrl, `/product/${content.query.productId}`)
    logMessage(`${process.env.APPLICATION_URL}/api/review${query}&productId=${content.query.productId}`);
    if (query.length === 0) {
        query="?";
    }
    else {
        query = query+"&"
    }
    // const review = await getRequest(
    //     `${process.env.APPLICATION_URL}/api/review${query}productId=${content.query.productId}`,
    //     "",
    //     true
    // )
    const review = {
        status: 200,
        data: [],
        nextPage: null,
        size: 10
    }
    // logMessage(review)
    const product = await getRequest(
        `${process.env.APPLICATION_URL}/api/product/${content.query.productId}`,
        {},
        true
    );
    if (product.status === 200) {
        return {
            props: {
                product: product.data,
                nextPage: `${review.data.nextPage}`,
                reviews: review.data.data,
                size: review.data.size
            }
        }
    }
    else {
        return {
            props: {
                product: {},
                nextPage: "null",
                reviews: [],
                size: 1
            }
        }
    }
}