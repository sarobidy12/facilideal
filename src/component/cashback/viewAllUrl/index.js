import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Data from "./data";
import axios from "axios";
import localhost from "../../../_config";
import { useCookies } from "react-cookie";
import MetaTags from "react-meta-tags";

import Carre from "../loader/rarre";
import Long from "../loader/long";
import Empiler from "../loader/empiler";

import Footer from '../../footer/index'

const ViewAllCahsback = () => {
  const [idca, setidca] = useState(null);
  const [nameca, setnameca] = useState(null);
  const [urlca, seturlca] = useState(null);
  const [stop2, setStop2] = useState(0);
  const [cookies, setCookie] = useCookies(null);

  useEffect(() => {

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setTimeout(() => {
      getCategorie();
    }, 500);

  });

  const WatsCategorie = function WatsCategorie(e) {
    var text = "";

    for (var i = 0; i < e.split("-").length; i++) {
      if (i === e.split("-").length - 1) {
        text = text + e.split("-")[i];
      } else {
        text = text + e.split("-")[i] + " ";
      }
    }

    return text;

  };

  const generateUrl = function generateUrl(e) {
    
    var text = "";

      for (var i = 0; i < e.split(" ").length; i++) {
        if (i === e.split(" ").length - 1) {
          text = text + e.split(" ")[i];
        } else {
          text = text + e.split(" ")[i] + "-";
        }
      }

        return text;

  };

  const getCategorie = function getCategorie() {
    for (var i = 0; i < cookies._categorieAndSousCAtegorie.length; i++) {
      if (
        cookies._categorieAndSousCAtegorie[i].nom_categorie ===
        WatsCategorie(window.location.pathname.split("/")[2])
      ) {
        setidca(cookies._categorieAndSousCAtegorie[i].id);
        setnameca(cookies._categorieAndSousCAtegorie[i].nom_categorie);
        seturlca(cookies._categorieAndSousCAtegorie[i].url_img);
      }
    }

    setStop2(1);

  };

  const heroData = function stop() {
    if (idca != null) {
      return (
        <div id="row-hero">
          <div className="inline-block img-view">
            <img src={urlca} data-aos="fade-right" />
          </div>
          <div className="inline-block contennt-titre-view">
            <h1>{nameca}</h1>
          </div>
        </div>
      );
    } else {
      return (
        <div id="row-hero">
          <div className="inline-block img-view">
            <Carre />
          </div>
          <div className="inline-block contennt-titre-view">
            <Long />
          </div>
        </div>
      );
    }
  };

  const NavLien = function NavLien() {
    if (stop2 === 1) {
      return (
        <div className="menu_cashabck_sous">
          <h2>
            <i className="glyphicon glyphicon-tasks" aria-hidden="true"></i>
            Categorie
          </h2>
          <ul>{getSousCategorie()}</ul>
        </div>
      );
    } else {
      return <Empiler />;
    }
  };

  const getSousCategorie = function getSousCategorie(e) {
    var resultat = [];

    for (var i = 0; i < cookies._categorieAndSousCAtegorie.length; i++) {
      if (
        cookies._categorieAndSousCAtegorie[i].nom_categorie ===
        WatsCategorie(window.location.pathname.split("/")[2]) + ""
      ) {
        for (
          var b = 0;
          b < cookies._categorieAndSousCAtegorie[i].souscategorie.length;
          b++
        ) {
          resultat.push(
            <li>
              <Link
                to={
                  "/casbackCategorie/"+generateUrl(nameca)+"/"+generateUrl(cookies._categorieAndSousCAtegorie[i].souscategorie[b].nom_sous_categorie)
                }
              >
                {
                  cookies._categorieAndSousCAtegorie[i].souscategorie[b]
                    .nom_sous_categorie
                }
              </Link>
            </li>
          );
        }
      }
    }
    return resultat;
  };

  return (
    <div>
      <MetaTags>
        <title> {WatsCategorie(window.location.pathname.split("/")[2])}</title>
      </MetaTags>

      <div id="hero-cashack">{heroData()}</div>

      <div className="container-view-all">
        <div className='row'>
          <div className='col-md-4'>
              {NavLien()}
          </div>

          <div className='col-md-8'>
              <Data />
          </div>
        </div>
        </div>

      <Footer/>
    </div>
  );
};
export default ViewAllCahsback;
