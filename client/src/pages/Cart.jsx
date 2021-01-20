import React,{useContext, useEffect,useCallback} from "react";
import classnames from "classnames";
import { ToastContainer } from "react-toastify";
import CartSummary from "../components/CartSummary";
import CartRightSideComponent from "../components/CartRightSideComponent";
import styles from "../css/Cart.module.css";
import PaymentGateway from "../components/PaymentGateway";
import headerWithToken from "../config/headerWithToken";
import api from "../config/api";
import axios from "axios";
import { ListData } from "../utils/ListData";
import { Context } from "../data/context";

const Cart = () => {
  const { cartData } = useContext(Context);
  const allData = ListData(cartData);

  const handleFetchedData = useCallback(() => {
    const postData = {
      "timeSlotRequestList":allData
    }
    console.log("body",postData)
    axios.post(api + 'common/validate',postData,headerWithToken).then(res=>{
      console.log("validate",res)
    }).catch(err=>{
      console.log(err.response)
    })
    },
    []
  );

  useEffect(() => {
    handleFetchedData()
  },[handleFetchedData])

  return (
    <div className={classnames("section", styles.CartWrapper)}>
      <div
        className={classnames("container is-fluid", styles.overRideContainer)}
      >
        <div className={classnames(" columns mt-5", styles.cartColumns)}>
          <div
            className={classnames(
              "column box has-text-centered",
              styles.cartSummaryWrapper
            )}
          >
            <CartSummary />
            {
              <PaymentGateway />
            }
          </div>

          <div
            className={classnames(
              "column is-two-thirds ",
              styles.SecondColumns
            )}
          >
            <CartRightSideComponent />
          </div>
        </div>
        <ToastContainer pauseOnHover={false} autoClose={3000} />
      </div>
    </div>
  );
};

export default Cart;
