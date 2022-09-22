import { useState, useEffect } from "react"
import styles from "../styles/Table.module.scss"

export default function BillData({data}){

    useEffect(() => {
        console.log(data)
    },[])

    return(
        <div className={styles.container}>
            <table className={styles.table1 }>
                <thead className={styles.thead1}>
                    <tr className={styles.tr1}>
                        <th className={styles.th1} colSpan="2">Field Name</th>
                        <th className={styles.th1}>Value</th>
                    </tr>
                </thead>
                <tbody className={styles.tbody1}>
                    <tr className={[styles.tr1,styles.midTr].join(" ")}>
                        <td className={styles.td1}>BL - Number</td>
                        <td className={[styles.td1,styles.midTd].join(" ")}>  رقم البوليصة</td>
                        <td className={styles.td1}>{data.BL}</td>
                    </tr>
                    <tr className={[styles.tr1,styles.midTr].join(" ")}>
                        <td className={styles.td1}>Shipping Method</td>
                        <td className={[styles.td1,styles.midTd].join(" ")}>طريقة التخليص</td>
                        <td className={styles.td1}>{data.U_ShippingMethod}</td>
                    </tr>
                    <tr className={[styles.tr1,styles.midTr].join(" ")}>
                        <td className={styles.td1}>Shipping Company</td>
                        <td className={[styles.td1,styles.midTd].join(" ")}> شركة الشحن</td>
                        <td className={styles.td1}>{data.U_ShippingCompany}</td>
                    </tr>
                    <tr className={[styles.tr1,styles.midTr].join(" ")}>
                        <td className={styles.td1}>No. of Container</td>
                        <td className={[styles.td1,styles.midTd].join(" ")}>عدد الحاويات</td>
                        <td className={styles.td1}>{data.U_NoofContainer}</td>
                    </tr>
                    <tr className={[styles.tr1,styles.midTr].join(" ")}>
                        <td className={styles.td1}>Container No.</td>
                        <td className={[styles.td1,styles.midTd].join(" ")}>أرقام الحاويات</td>
                        <td className={styles.td1}>{data.U_ContainerNo}</td>
                    </tr>
                    <tr className={[styles.tr1,styles.midTr].join(" ")}>
                        <td className={styles.td1}>ETS</td>
                        <td className={[styles.td1,styles.midTd].join(" ")}> موعد الشحن</td>
                        <td className={styles.td1}>{data.U_ETS.substring(10,-1)}</td>
                    </tr>
                    <tr className={[styles.tr1,styles.midTr].join(" ")}>
                        <td className={styles.td1}>ETA</td>
                        <td className={[styles.td1,styles.midTd].join(" ")}>موعد الوصول</td>
                        <td className={styles.td1}>{data.U_ETA.substring(10,-1)}</td>
                    </tr>
                    <tr className={[styles.tr1,styles.midTr].join(" ")}>
                        <td className={styles.td1}>Storage Method</td>
                        <td className={[styles.td1,styles.midTd].join(" ")}>طريقة التخزين</td>
                        <td className={styles.td1}>{data.U_StorageMethod}</td>
                    </tr>
                    <tr className={[styles.tr1,styles.midTr].join(" ")}>
                        <td className={styles.td1}>Clearance Company</td>
                        <td className={[styles.td1,styles.midTd].join(" ")}> شركة التخليص</td>
                        <td className={styles.td1}>{data.U_ClearanceCompany}</td>
                    </tr>
                    <tr className={styles.tr1}>
                        <td className={styles.td1}>PO Status</td>
                        <td className={[styles.td1,styles.midTd].join(" ")}>حالة الطلب</td>
                        <td className={styles.td1}>{data.U_PO_Status}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}