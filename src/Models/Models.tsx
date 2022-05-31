export interface primaryRoutesModel{
    label :string;
    link:string;
    component:()=>{}

}
export interface userLoginInfo {
    id:number;
    emailid:string;
    role:string;
    token:string;
    password?:string;
userDetails?:userDetails
}
export interface userDetails{
    uid:number;
    firstname:string;
    lastname:string;
    position:string;
    profileimage?:string;
    phoneno:string;
}