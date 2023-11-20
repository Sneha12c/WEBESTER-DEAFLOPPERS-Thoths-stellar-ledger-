import mediaquery from "../hooks/mediaquery";
// import AnchorLink from "react-anchor-link-smooth-scroll";
import main from "../images/main.png"

const Home = ({setselectedpage}) =>{
 const isabovelarge = mediaquery("(min-width:1060px)");
 return(
    <div >
 <section
      id="home"
      className={`md:flex md:justify-between md:items-center gap-16 md:h-1/2 py-10`}>
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
     <span className="xs:relative xs:text-white xs:font-semibold z-20 xs:before:content-brush
              before:absolute before:-left-[25px] before:-top-[70px] before:z-[-1]"
            >
              Ever feel like you're throwing money away? Take control of your
               cashflow by logging what you've spent with this simple expense tracking website
            </span>
    </div>
 </section>
 <section id="features" className={`pt-10 pb-24 m-10 `}>
 <div className={` md:justify-between md:gap-16 mt-32`}>
    <h4 className={`font-playfair font-bold text-red text-5xl`}>
        Features
    </h4>
    <div className={`h-0.5 w-48 bg-gradient-rainblue`}></div>
 </div>
    <div className= {`md: ${ isabovelarge ? ("flex") : ("grid")} md:justify-between items:centre mt-16 gap-20`}>
       <div className={``} >
      <div className= {`relative h-16`}>
        <div className={`z-10 `}>
          <p className={`font-playfair font-semibold text-3xl mt-3 px-3 text-deep-blue`}>
          Record of daily expenses </p>
        </div>
        <div className={` w-full h-20 bg-blue rounded-lg absolute right-0 top-0 z-[-1]`} />
        </div> 
          <p className={`mt-4 font-playfair text-lg text-white`}
          >Effortlessly monitor and manage your financial health with our expense tracking feature ,
           allowing you to record, categorize, and analyze your expenditures in real-time</p>
      </div>
       {/* 2nd description */}
      <div>
      <div className={`relative h-16`}>
        <div className={`z-10`}>
          <p className={`font-playfair font-semibold text-3xl mt-3 px-3 text-deep-red`}>
          Reports and Analytics              
          </p>
        </div>
        <div className="w-full h-20 bg-red rounded-lg absolute right-0 top-0 z-[-1]" />
    </div>
    <p className={`mt-4 font-playfair text-lg text-white`} >
    Unlock financial clarity with robust reports and analytics, providing visual insights into your spending patterns, trends, and personalized financial
     analytics to empower informed decision-making
    </p> 
     </div>

      {/* 3rd feature */}
      <div>
      <div className="relative h-16">
        <div className="z-10">
          <p className="font-playfair font-semibold text-3xl mt-3 px-3">
          Reminder and Notification             
          </p>
        </div>
        <div className="w-full h-20 bg-yellow rounded-lg absolute right-0 top-0 z-[-1]" />
    </div>
    <p className={`mt-4 font-playfair text-lg text-white`} >
    Never miss a beat with our reminder and notification feature, ensuring timely alerts for upcoming bills, budget thresholds, and important financial milestones 
    to keep you on top of your financial game
    </p>
    </div>
   </div>
 </section>
 </div>
 )
}

export default Home;
