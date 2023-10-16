import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IProduct } from './product';
import { Observable } from 'rxjs';
import { Authdetails } from './authdetails';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public cId: any;
  public authDetails: Authdetails = new Authdetails();
  public token: any;
  public userRole: string='';
  products:any[]=[];

  private _url:string="http://localhost:8081/products/view";
  private urlForLogin = "http://localhost:9898/auth/validate";
  private urlForSignUp="http://localhost:9898/auth/register";
  private urlForelec="http://localhost:8765/products/viewByCategoryId/electronics"
  private urlForCloth="http://localhost:8765/products/viewByCategoryId/clothes";
  private urlForaddCustomerToCart = "http://localhost:8080/cart/add/";
  private urlForgetCustomerId = "http://localhost:8765/cart/getCustomerId/";
  private urlForGetCart="http://localhost:8765/cart/getProductList/";
  private urlForCartTotal = "http://localhost:8765/orders/add/";
  private urlForDeleteProductFromCart="http://localhost:8765/cart/remove/";
  private urlForCreateTransaction="http://localhost:8765/transactionService/createTransaction/";
  private urlForCustomerDetails = "http://localhost:8765/auth/customerById/";
  private urlForAddToDatabase = "http://localhost:8765/cart/addToDatabase";
  private urlForGeneratingCode = "http://localhost:9898/auth/sendVerificationCode";
  private urlForVerifyEmail = "http://localhost:9898/auth/verifyAccount/";
  private urlForAddProductToDatabase="http://localhost:8081/products/add";
  private urlForRemoveProductFromDatabase="http://localhost:8081/products/remove/";
  private urlForGenerateToken = "http://localhost:9898/auth/generatetoken";
  private urlForaddProductToHistory="http://localhost:8765/cart/addProductToHistory/";
  private urlForgetHistoryProducts="http://localhost:8765/cart/getHistoryProducts/";
  //{cartId}/{productId}

  constructor(private http:HttpClient) { }

  getProducts():Observable<IProduct[]>{
    return this.http.get<IProduct[]>(this._url);

  }

  getCartDetails():Observable<any[]>{
    return this.http.get<any[]>(this._url);

  }

  validateUser(authDetail: Authdetails): Observable<any>{
    this.authDetails.username = authDetail.username;
    return this.http.post<any>(`${this.urlForLogin}`, authDetail);
  }

  register(user: any): Observable<string> {
    return this.http.post<string>(this.urlForSignUp, user);
  }

  getElectronicsProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.urlForelec);
  }

  getClothProducts():Observable<any[]>{
    return this.http.get<any[]>(this.urlForCloth);
  }
  
  addToCart(productId: number): Observable<any> {
    return this.http.post<any>(this.urlForaddCustomerToCart + this.cId + "/" + productId, this.cId);
  }

  getCId(): Observable<any>{
    return this.http.get<any>(this.urlForgetCustomerId + this.authDetails.username);
  }

  displayProductInCart(): Observable<any>{
    return this.http.get<any>(this.urlForGetCart + this.cId);
  }

  getCartTotal(): Observable<any>{
    return this.http.get<any>(this.urlForCartTotal + this.cId);
  }

  removeProductFromCart(productId: number):Observable<any>{
    return this.http.get<any>(this.urlForDeleteProductFromCart+this.cId+"/"+productId);
  }

  createTransaction(amount: any): Observable<any>{
    return this.http.get<any>(this.urlForCreateTransaction + amount);
  }

  getCustomerDetails(): Observable<any>{
    let tokenStr = 'Bearer ' + this.token;
    const headers = new HttpHeaders().set("Authorization", tokenStr);
    return this.http.get<any>(this.urlForCustomerDetails + this.cId, {headers, responseType:'text' as 'json'});
  }

  addToDatabase(): Observable<any>{
    return this.http.get<any>(this.urlForAddToDatabase);
  }

  sendVerificationCode(user: any): Observable<any>{
    this.authDetails.username = user.username;
    this.authDetails.password = user.password;
    return this.http.post<any>(`${this.urlForGeneratingCode}`, this.authDetails);
  }
  verifyEmail(token: any): Observable<any>{
    return this.http.get<any>(this.urlForVerifyEmail + token);
  }

  addProducts(formData:FormData) {
    return this.http.post(this.urlForAddProductToDatabase, formData);  
  }

  removeProducts(productId:number){
    return this.http.delete(this.urlForRemoveProductFromDatabase+productId);

  }

  generateToken(authDetail: any): Observable<any>{
    return this.http.post<any>(this.urlForGenerateToken, authDetail);
  }

//1
  addToHistory(): Observable<any> {
    return this.http.post<any>(this.urlForaddProductToHistory + this.cId,this.cId);
  }

  getProductFromHistory(){
    return this.http.get<any>(this.urlForgetHistoryProducts+this.cId);
  }
  //

  setAdminRole() {
    this.userRole = 'ADMIN';
  }

  setUserRole() {
    this.userRole = 'USER';
  }

  isUserAdmin(): boolean {
    return this.userRole === 'ADMIN';
  }

  isUserUser(): boolean {
    return this.userRole === 'USER';
  }

  setAuthDetail(authDetail: Authdetails) {
    this.authDetails = authDetail;
  }

  getAuthDetail(): Authdetails {
    return this.authDetails;
  }

  setConfirmationProducts(products: any[]){
    this.products=products;
  }

  getConfirmationProducts():any[]{
    return this.products;
  }

}
