import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { SuperadminService } from '../../superadmin.service';
import { CommonService } from '../../common.service';


export interface User {
name: string;
  }
@Component({
  templateUrl:'./reloan.component.html',
})

export class ReloanComponent {
myControl = new FormControl();
val:any=[];
selectedFile:File = null;
selectedFile1:File = null;
selectedFile2:File = null;
tempval:any;
tempval1:any;
array:any=[];
array1:any=[];
constructor(private route: ActivatedRoute,private router:Router,private service:SuperadminService,private commonservice: CommonService){}

model:any={};
fetchData:any;
fetchData1:any;
fetchData2:any;
fetchData5:any;
fetchData6:any;

dob:any;
idvalue;

ngOnInit() {
  this.commonservice.getemployeetypelist().subscribe(res=>{
    this.fetchData6=res;
  });
  this.commonservice.getloanlist().subscribe(res=>{
    console.log(res);
    this.fetchData = res;
  });


  this.commonservice.getexecutivelist().subscribe(res=>{
    this.fetchData1 = [];
    console.log(res);
    for(var i=0;i<Object.keys(res).length;i++){
      if(res[i].iduser!=null){
      this.fetchData1.push(res[i]);
      }
    }
  });

  this.route.params.subscribe(params=>{
    console.log(params['id']);
    this.idvalue = params['id'];
    this.commonservice.editcust(params['id']).subscribe(res => {
      console.log(res);
      this.model=res[0];
    });
  })
  this.commonservice.getvendornames()
  .subscribe(res=>{
    // console.log(this.array);
    console.log(res);
    this.fetchData5=res;
  })
 

  this.commonservice.getbanklist().subscribe(res=>{
    console.log(res);
    this.fetchData2 = res;
  });

}



orgValueChange(date){
  //console.log('');
  this.dob=date;
}


displayFn(user?: User): string | undefined {
  return user ? user.name : undefined;
  
}
addvalues()
{
console.log(this.model.previousbankname);
console.log(this.fetchData);
var abc = this.model.previousbankname.split(",",2);
var def = this.model.previousapplytype.split(",",2);

this.array.push({
previousamounttaken:this.model.previousamounttaken,
previousbankname:abc[1],
bankid:abc[0],
previousapplytype:def[1],
loanid:def[0],
roi:this.model.roi,
pf:this.model.pf,
pl:this.model.pl,
insurance:this.model.insurance,
startdate:this.model.startdate,
maturity:this.model.maturity


})
console.log(this.array);
this.tempval=this.array;

}
onFileSelected(event){
    console.log(event);
    this.selectedFile = <File>event.target.files[0];
  }
  onFileSelected1(event){
    console.log(event);
    this.selectedFile1 = <File>event.target.files[0];
  }
  onFileSelected2(event){
    console.log(event);
    this.selectedFile2 = <File>event.target.files[0];
  }
  submitForm(value){
    console.log(value);
        const fd=new FormData();
        console.log(this.tempval);
     
        if(this.selectedFile!=null){
          fd.append('cimage',this.selectedFile,this.selectedFile.name);
         }
         else
         {
          fd.append('cimage',"admin.png");
         }
    
    
         if(this.selectedFile1!=null){
          fd.append('pimage',this.selectedFile,this.selectedFile.name);
         }
         else
         {
          fd.append('pimage',"admin.png");
         }
    
         if(this.selectedFile2!=null){
          fd.append('aimage',this.selectedFile,this.selectedFile.name);
         }
         else
         {
          fd.append('aimage',"admin.png");
         }
    
        fd.append('name',this.model.name);
        fd.append('dob',this.model.dob);
        fd.append('mobile',this.model.mobile);
        fd.append('email',this.model.email);
        fd.append('cemail',this.model.cemail);
        fd.append('altmobile',this.model.altmobile);
        fd.append('salary',this.model.salary);
        fd.append('address',this.model.address);
        fd.append('cname',this.model.cname);
        fd.append('caddress',this.model.caddress);
        fd.append('designation',this.model.designation);
        fd.append('amount',this.model.amount);
        fd.append('gender',this.model.gender);
        fd.append('pincode',this.model.pincode);
        fd.append('idexecutive',this.model.idexecutive);
        fd.append('applytype',this.model.applytype);
        fd.append('idno',this.model.idno);
        fd.append('documents',this.model.documents);
        fd.append('subvendor',this.model.subvendor);
        fd.append('sourcetype',this.model.sourcetype);
        fd.append('aadharno',this.model.aadharno);
        // console.log('aadharno');
        fd.append('panno',this.model.panno);
        fd.append('dlno',this.model.dlno);
        fd.append('voterno',this.model.voterno);
        fd.append('applieddate',this.model.applieddate);
        fd.append('idcustomer',this.idvalue);
        fd.append('createdby',localStorage.getItem("id"));
        
        fd.append('emptype',this.model.emptype);
    
    
        fd.append('arr',JSON.stringify(this.tempval));
        fd.append('arr1',JSON.stringify(this.tempval1));
        console.log(fd);



    console.log(fd);
    this.commonservice.reloanapply(fd).subscribe(res=>{

 
    this.router.navigate(["/members/approval"]);
    });
    //  this.refresh();
}
refresh(){
    window.location.reload();
  }
  clearFilters()
  {
    this.model.previousapplytype='';
    this.model.previousbankname='';
    this.model.previousamounttaken='';
    this.model.roi='';
    this.model.pf='';
    this.model.pl='';
    this.model.insurance='';
    this.model.startdate='';
    this.model.maturity='';
this.model.coname='';
this.model.copaddress='';
this.model.coraddress='';

  }
  checknumber(obj){
    console.log(obj);
    // var idno=obj.idno;
  this.commonservice.checknumber(obj).subscribe(res=>{
  console.log(res['status']);
  this.model.status = res['status']; 
     
  });
  }
  
  checkaadharnumber(obj){
    console.log(obj);
    // var idno=obj.idno;
  this.commonservice.checkaadharnumber(obj).subscribe(res=>{
  console.log(res['status']);
  this.model.aadharstatus = res['status']; 
     
  });
  }
  checkpannumber(obj){
    console.log(obj);
  this.commonservice.checkpannumber(obj).subscribe(res=>{
  console.log(res['status']);
  this.model.panstatus = res['status']; 
     
  });
  }
  checkdlnumber(obj){
    console.log(obj);
  this.commonservice.checkdlnumber(obj).subscribe(res=>{
  console.log(res['status']);
  this.model.dlstatus = res['status']; 
     
  });
  }
  checkvoternumber(obj){
    console.log(obj);
  this.commonservice.checkvoternumber(obj).subscribe(res=>{
  console.log(res['status']);
  this.model.voterstatus = res['status']; 
     
  });
  }
  addvalues1()
  {
this.array1.push({
  coname:this.model.coname,
  copaddress:this.model.copaddress,
  coraddress:this.model.coraddress


}) 
console.log(this.array1);
this.tempval1=this.array1;

  }
  removevalue(pro,index)
  {
    console.log(index);
    this.array.splice(index,1);
  }

}