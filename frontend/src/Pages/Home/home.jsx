import Features from "../../component/Feature";
import mediaquery from "../../hooks/mediaquery";
import main from "../../images/main.png";


const Home = () =>{
 const isabovelarge = mediaquery("(min-width:1060px)");
 return(
    <div >
 <section
      id="home"
      className={`md:flex md:justify-between md:items-center gap-16 md:h-1/2 py-10 m-10`}>
    <div className={`md:order-2 flex justify-center basis-3/5 mt-16 md:mt-32`}>
    {
        isabovelarge ?(
         <div className={`relative z-0 ml-20 before:absolute before:-top-20 before:-left-20 `}
         >
        <img
              alt="mainimage"
              className={`hover:filter hover:saturate-200 transition duration-500 z-10 w-full 
              max-h-[600px] max-w-[400px] md:max-w-[600px] rounded-full border-8 border-blue`}
              src={main}
            />
         </div>
        ) : (
            <img alt="mainimage"
            className={`z-10 w-full max-w-[400px] md:max-w-[600px] rounded-full border-8 border-blue`}
            src={main} />
        )
    }
    </div>
    <div className={`z-30 basis-2/5 mt-12 md:mt-32 md: ml-10`}>
     <p className={`text-6xl font-playfair z-10 text-center md:text-start`}>
     Track your monthly expenses </p>
     <span className="xs:relative xs:font-semibold z-20 xs:before:content-brush
              before:absolute before:-left-[25px] before:-top-[70px] before:z-[-1]"
            >
              Ever feel like you're throwing money away? Take control of your
               cashflow by logging what you've spent with this simple expense tracking website
            </span>
    </div>
 </section>
 <section id="features" className={`pt-10 pb-24 m-10 `}>
   <Features isabovelarge = {isabovelarge}/>
 </section>
 </div>
 )
}

export default Home;
