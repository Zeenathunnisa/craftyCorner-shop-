import React, { useState, useEffect } from "react";
import {
  AiFillHeart,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import { addToWishlist, removeFromWishlist } from "../../../redux/actions/wishlist";
import { addTocart } from "../../../redux/actions/cart";
import Ratings from "../../Products/Ratings";

const ProductCard = ({ data, isEvent }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (wishlist?.find((item) => item._id === data?._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist, data]);

  // Return loading UI if data is not available
  if (!data) {
    return <div>Loading...</div>;
  }

  const removeFromWishlistHandler = () => {
    setClick(false);
    dispatch(removeFromWishlist(data));
    toast.info("Removed from wishlist.");
  };

  const addToWishlistHandler = () => {
    setClick(true);
    dispatch(addToWishlist(data));
    toast.success("Added to wishlist!");
  };

  const addToCartHandler = () => {
    const isItemExists = cart?.find((item) => item._id === data._id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else if (data.stock < 1) {
      toast.error("Product out of stock!");
    } else {
      const cartData = { ...data, qty: 1 };
      dispatch(addTocart(cartData));
      toast.success("Item added to cart!");
    }
  };

  return (
    <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
      <Link to={isEvent ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}>
        <img
          src={data.images?.[0]?.url || "https://via.placeholder.com/170"}
          alt={data.name || "Product"}
          className="w-full h-[170px] object-contain"
        />
      </Link>
      <Link to={`/shop/preview/${data.shop?._id}`}>
        <h5 className={styles.shop_name}>{data.shop?.name || "Shop Name"}</h5>
      </Link>
      <Link to={isEvent ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}>
        <h4 className="pb-3 font-[500]">
          {data.name?.length > 40 ? `${data.name.slice(0, 40)}...` : data.name}
        </h4>
      </Link>
      <div className="flex">
        <Ratings rating={data.ratings || 0} />
      </div>
      <div className="py-2 flex items-center justify-between">
        <div className="flex">
          <h5 className={styles.productDiscountPrice}>
            ₹ {data.discountPrice || data.originalPrice || "N/A"}
          </h5>
          {data.originalPrice && (
            <h4 className={styles.price}>₹ {data.originalPrice}</h4>
          )}
        </div>
        <span className="font-[400] text-[17px] text-[#68d284]">
          {data.sold_out || 0} sold
        </span>
      </div>
      {/* Side Options */}
      <div>
        {click ? (
          <AiFillHeart
            size={22}
            className="cursor-pointer absolute right-2 top-5"
            onClick={removeFromWishlistHandler}
            color="red"
            title="Remove from wishlist"
          />
        ) : (
          <AiOutlineHeart
            size={22}
            className="cursor-pointer absolute right-2 top-5"
            onClick={addToWishlistHandler}
            color="#333"
            title="Add to wishlist"
          />
        )}
        <AiOutlineEye
          size={22}
          className="cursor-pointer absolute right-2 top-14"
          onClick={() => setOpen(!open)}
          color="#333"
          title="Quick view"
        />
        <AiOutlineShoppingCart
          size={25}
          className="cursor-pointer absolute right-2 top-24"
          onClick={addToCartHandler}
          color="#444"
          title="Add to cart"
        />
        {open && <ProductDetailsCard setOpen={setOpen} data={data} />}
      </div>
    </div>
  );
};

export default ProductCard;
