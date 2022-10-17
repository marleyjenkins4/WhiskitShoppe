import React from "react";


const Footer = () => {
    return (
        <footer id = "social">
            <div className="footerPhoto">
            <ul className="socials">
                <li>
                    <a href="https://www.facebook.com/thewhiskitshoppe/?ref=page_internal">
                        <i className="fa fa-facebook"></i>
                    </a>
                </li>
                <li>
                    <a href="https://instagram.com/thewhiskitshoppe?igshid=YmMyMTA2M2Y=">
                        <i className="fa fa-instagram"></i>
                    </a>
                </li>
            </ul>
            <div id="copyright">
                <p id="copyright"> © 2022 Copyright</p>
               
            </div>
            </div>
        </footer>
    )
}

export default Footer;
