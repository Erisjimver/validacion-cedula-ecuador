var num = document.getElementById("cedula");
var boton = document.getElementById("boton");
boton.addEventListener("click", validar)
var res = document.getElementById("resultado");

function validar()
{
    var cedula= num.value;
    if(cedula.length==10 ||  cedula.length==13)
    {
        var cp=(cedula.substr(0,2));//tomar los dos primeros digitos
        if (cp >= 1 && cp <= 24)//comproboar que los digitos no superen  el #24 = provincias del ecuador
        {
            var tercer_dig=(cedula.substr(2,1));// # numeros enter 0 y 6)
            if (tercer_dig >= 0 && tercer_dig < 6)// # numeros enter 0 y 6)
            {
                res.innerHTML = "ta bueno: "+tercer_dig; 
                if (cedula.length == 10)
                {
                    console.log("cedula");    
                    validar_ced_ruc(cedula,0)                
                }
                else if (cedula.length == 13)
                {
                    console.log("ruc");  
                    if (cedula.substr(10,3)==001)//se verifica q los ultimos numeros sean 001
                    {        
                        validar_ced_ruc(cedula.substr(0,10),0);
                    }
                    else
                    {
                        res.innerHTML = "Ultimos 3 digitos deben ser: 001 ";                  
                    }
                }
            }
            else if (tercer_dig.length == 6)
            {
                    //sociedades publicas
                    validar_ced_ruc(cedula,1) 
                    console.log("sociedades publicas");  
            }  
            else if (tercer_dig.length == 9) // si es ruc
            {
                   //sociedades privadas
                    validar_ced_ruc(cedula,2);
                    console.log("si es ruc");  
            }   
            else
            {
                console.log("tercer digito invalido.."); 
                res.innerHTML = "ta malo: "+tercer_dig;  
            } 
        }      
        else
        {
            console.log("codigo de provincia incorrecto.."); 
        }
    }     
    else
    {
        res.innerHTML = "longitud del DNI incorrecta"; 
        console.log("codigo de provincia incorrecto..");  
    } 

}


function validar_ced_ruc(cedu,tipo)
{
    total = 0;
    total1 = 0;
    resultadoResta=0;
    if(tipo == 0)// # cedula y r.u.c persona natural
    {
        base = 10
        d_ver=(cedu.substr(9));//# digito verificador
        multip = [2, 1, 2, 1, 2, 1, 2, 1, 2]
    }
    else if (tipo == 1) // # r.u.c. publicos
    {
        base = 11
        d_ver=(cedu.substr(8));
        multip = [3, 2, 7, 6, 5, 4, 3, 2 ]
    }
    else if (tipo == 2) //# r.u.c. juridicos y extranjeros sin cedula
    {
        base = 11
        d_ver=(cedu.substr(9));
        multip = [4, 3, 2, 7, 6, 5, 4, 3, 2]
    }

     for ( i=0; i<= multip.length-1; i++ )
     {
         p = cedu.substr(i,1) * multip[i];
        
         if (p < 10)
         {
            total+=p;
            total1+=p;
         }
        else
         {
            console.log("Se paso de 10 uno de los numeros");
            total += p-9;
            total1 +=p;
         }
                console.log(total);
                console.log(total1);
             
     }
                resultadoResta=total1-total;
                console.log(resultadoResta);

    mod = total % base;
    
    if (mod != 0)
    {
      val = base - mod;  
    }     
     else
     {
        val = 0;
     } 

    if (val==d_ver)
    {
        res.innerHTML = "cedula valida";
    }
    else
    {
        res.innerHTML = "cedula invalida";
    }

    return val == d_ver
}




