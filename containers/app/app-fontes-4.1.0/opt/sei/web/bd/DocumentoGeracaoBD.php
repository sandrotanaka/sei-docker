<?
/**
* TRIBUNAL REGIONAL FEDERAL DA 4� REGI�O
*
* 02/12/2021 - criado por mgb29
*
* Vers�o do Gerador de C�digo: 1.43.0
*/

require_once dirname(__FILE__).'/../SEI.php';

class DocumentoGeracaoBD extends InfraBD {

  public function __construct(InfraIBanco $objInfraIBanco){
  	 parent::__construct($objInfraIBanco);
  }

}