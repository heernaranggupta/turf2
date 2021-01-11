import React, { useState, useCallback, useEffect } from "react";

const Invoice = () =>{
    return(
    <div>
        <div>Invoice</div>
        <table class="table is-responsive">
            <thead>
            <tr>
                <th>Payment Method</th>
                <th>Payment Id</th>
                <th>Ground</th>
                <th>Price</th>
                <th>Total</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>Lorem ipsum - cell A1</td>
                <td>Lorem ipsum - cell B1</td>
                <td>Lorem ipsum - cell C1</td>
            </tr>
            <tr>
                <td>Lorem ipsum - cell A2</td>
                <td>Lorem ipsum - cell B2</td>
                <td>Lorem ipsum - cell C2</td>
            </tr>
            <tr>
                <td>Lorem ipsum - cell A3</td>
                <td>Lorem ipsum - cell B3</td>
                <td>Lorem ipsum - cell C3</td>
            </tr>
            </tbody>
        </table>
    </div>
    );
}
export default Invoice;