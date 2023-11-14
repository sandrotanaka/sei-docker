<?
 require_once dirname(__FILE__).'/../web/Sip.php';

class VersaoSipRN extends InfraScriptVersao {

  public function __construct(){
    parent::__construct();
  }

  protected function inicializarObjInfraIBanco(){
    return BancoSip::getInstance();
  }

  public function versao_2_0_0($strVersaoAtual){

  }

  public function versao_2_1_0($strVersaoAtual){
    try{

      if (BancoSip::getInstance() instanceof InfraMySql){
        $objScriptRN = new ScriptRN();
        $objScriptRN->atualizarSequencias();
      }

      InfraDebug::getInstance()->setBolDebugInfra(true);

      $objInfraMetaBD = new InfraMetaBD(BancoSip::getInstance());
      $objInfraMetaBD->setBolValidarIdentificador(true);

      if (BancoSip::getInstance() instanceof InfraOracle){
        $objInfraMetaBD->alterarColuna('orgao','ordem',$objInfraMetaBD->tipoNumero(),'not null');
        $objInfraMetaBD->alterarColuna('infra_log','sta_tipo',$objInfraMetaBD->tipoTextoFixo(1),'not null');
      }

      $numIdSistemaSip = ScriptSip::obterIdSistema('SIP');
      $numIdPerfilSipAdministradorSistema = ScriptSip::obterIdPerfil($numIdSistemaSip,'Administrador de Sistema');
      $numIdMenuSip = ScriptSip::obterIdMenu($numIdSistemaSip,'Principal');
      $numIdItemMenuSipPerfis = ScriptSip::obterIdItemMenu($numIdSistemaSip,$numIdMenuSip,'Perfis');

      $this->logar('ATUALIZANDO BASE/RECURSOS SIP...');

      $this->fixIndices21($objInfraMetaBD);

      BancoSip::getInstance()->executarSql('update infra_agendamento_tarefa set sta_periodicidade_execucao=\'N\', periodicidade_complemento=\'0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55\' where comando=\'AgendamentoRN::testarAgendamento\'');

      $objInfraMetaBD->adicionarColuna('item_menu','icone',$objInfraMetaBD->tipoTextoVariavel(250),'null');

      ScriptSip::adicionarRecursoPerfil($numIdSistemaSip, $numIdPerfilSipAdministradorSistema, 'perfil_importar');
      $objRecursoDTO = ScriptSip::adicionarRecursoPerfil($numIdSistemaSip, $numIdPerfilSipAdministradorSistema, 'perfil_comparar');
      ScriptSip::adicionarItemMenu($numIdSistemaSip,$numIdPerfilSipAdministradorSistema,$numIdMenuSip,$numIdItemMenuSipPerfis,$objRecursoDTO->getNumIdRecurso(),'Comparar', 80);

    }catch(Exception $e){
      throw new InfraException('Erro atualizando vers�o.', $e);
    }
  }

  public function versao_3_0_0($strVersaoAtual){
    try{

      if (BancoSip::getInstance() instanceof InfraMySql){
        $objScriptRN = new ScriptRN();
        $objScriptRN->atualizarSequencias();
      }

      InfraDebug::getInstance()->setBolDebugInfra(true);

      $objInfraMetaBD = new InfraMetaBD(BancoSip::getInstance());
      $objInfraMetaBD->setBolValidarIdentificador(true);

      try{
        $numIdSistemaSip = ScriptSip::obterIdSistema('SIP');
      }catch(Exception $e){
        $numIdSistemaSip = ScriptSip::obterIdSistema('SIP-TST');
      }

      try{
        $numIdSistemaSei = ScriptSip::obterIdSistema('SEI');
      }catch(Exception $e){
        $numIdSistemaSei = ScriptSip::obterIdSistema('SEI-TST');
      }

      $objInfraMetaBD->alterarColuna('infra_agendamento_tarefa', 'periodicidade_complemento', $objInfraMetaBD->tipoTextoVariavel(200), 'null');

      $numIdPerfilSipAdministradorSip = ScriptSip::obterIdPerfil($numIdSistemaSip,'Administrador SIP');
      $numIdPerfilSipAdministradorSistema = ScriptSip::obterIdPerfil($numIdSistemaSip,'Administrador de Sistema');
      $numIdPerfilSipBasico = ScriptSip::obterIdPerfil($numIdSistemaSip,'B�sico');
      $numIdPerfilSipCoordenadorPerfil = ScriptSip::obterIdPerfil($numIdSistemaSip,'Coordenador de Perfil');
      $numIdPerfilSipCoordenadorUnidade = ScriptSip::obterIdPerfil($numIdSistemaSip,'Coordenador de Unidade');
      $numIdPerfilSipAdministradorSip = ScriptSip::obterIdPerfil($numIdSistemaSip,'Administrador SIP');

      $numIdMenuSip = ScriptSip::obterIdMenu($numIdSistemaSip,'Principal');
      $numIdItemMenuSipInfra = ScriptSip::obterIdItemMenu($numIdSistemaSip,$numIdMenuSip,'Infra');

      $rs = BancoSip::getInstance()->consultarSql('select count(*) as total from infra_parametro where nome = \'SIP_EMAIL_SISTEMA\'');
      if ($rs[0]['total']==0) {
        BancoSip::getInstance()->executarSql('insert into infra_parametro (nome, valor) values (\'SIP_EMAIL_SISTEMA\',\'\')');
      }

      $rs = BancoSip::getInstance()->consultarSql('select count(*) as total from infra_parametro where nome = \'SIP_NUM_HISTORICO_ULTIMOS_ACESSOS\'');
      if ($rs[0]['total']==0) {
        BancoSip::getInstance()->executarSql('insert into infra_parametro (nome, valor) values (\'SIP_NUM_HISTORICO_ULTIMOS_ACESSOS\',\'10\')');
      }

      $rs = BancoSip::getInstance()->consultarSql('select count(*) as total from infra_parametro where nome = \'SIP_TEMPO_DIAS_HISTORICO_ACESSOS\'');
      if ($rs[0]['total']==0) {
        BancoSip::getInstance()->executarSql('insert into infra_parametro (nome, valor) values (\'SIP_TEMPO_DIAS_HISTORICO_ACESSOS\',\'90\')');
      }

      $this->logar('ATUALIZANDO BASE SIP...');

      if (count($objInfraMetaBD->obterColunasTabela('item_menu','icone'))==0){
        $objInfraMetaBD->adicionarColuna('item_menu','icone',$objInfraMetaBD->tipoTextoVariavel(250),'null');
      }

      BancoSip::getInstance()->executarSql('delete from login');
		#linhas comentadas por causa de erro na execu��o do script
      #$objInfraMetaBD->adicionarColuna('login','http_client_ip',$objInfraMetaBD->tipoTextoVariavel(39),'null');
      #$objInfraMetaBD->adicionarColuna('login','remote_addr',$objInfraMetaBD->tipoTextoVariavel(39),'null');
      #$objInfraMetaBD->adicionarColuna('login','http_x_forwarded_for',$objInfraMetaBD->tipoTextoVariavel(39),'null');


      $objInfraMetaBD->excluirIndice('login','i06_login');

      if (BancoSip::getInstance() instanceof InfraOracle){
        $objInfraMetaBD->excluirChavePrimaria('login','pk_login');
      }

      $objInfraMetaBD->excluirIndice('login','i07_login');

      if (BancoSip::getInstance() instanceof InfraOracle){
        $objInfraMetaBD->adicionarChavePrimaria('login','pk_login',array('id_login','id_usuario','id_sistema'));
      }

      #$objInfraMetaBD->adicionarColuna('login','sta_login',$objInfraMetaBD->tipoTextoFixo(1),'not null');
      #$objInfraMetaBD->adicionarColuna('login','user_agent',$objInfraMetaBD->tipoTextoVariavel(500),'not null');
      #$objInfraMetaBD->excluirColuna('login','sin_validado');

      $objInfraMetaBD->criarIndice('login','i04_login',array('id_login','id_sistema','id_usuario','sta_login'));
      $objInfraMetaBD->criarIndice('login','i05_login',array('id_login','id_sistema','id_usuario','dth_login'));
      $objInfraMetaBD->criarIndice('login','i06_login',array('hash_usuario','dth_login','sta_login'));
      $objInfraMetaBD->criarIndice('login','i07_login',array('dth_login'));

      $objRecursoDTO = ScriptSip::adicionarRecursoPerfil($numIdSistemaSip, $numIdPerfilSipAdministradorSip, 'modulo_listar');
      ScriptSip::adicionarItemMenu($numIdSistemaSip,$numIdPerfilSipAdministradorSip, $numIdMenuSip, $numIdItemMenuSipInfra,$objRecursoDTO->getNumIdRecurso(),'M�dulos', 0);

      $objRecursoDTO = ScriptSip::adicionarRecursoPerfil($numIdSistemaSip, $numIdPerfilSipAdministradorSip, 'infra_atributo_cache_listar');
      ScriptSip::adicionarItemMenu($numIdSistemaSip,$numIdPerfilSipAdministradorSip, $numIdMenuSip, $numIdItemMenuSipInfra,$objRecursoDTO->getNumIdRecurso(),'Cache em Mem�ria', 0);
      ScriptSip::adicionarRecursoPerfil($numIdSistemaSip, $numIdPerfilSipAdministradorSip, 'infra_atributo_cache_excluir');
      ScriptSip::adicionarRecursoPerfil($numIdSistemaSip, $numIdPerfilSipAdministradorSip, 'infra_atributo_cache_consultar');

      ScriptSip::adicionarRecursoPerfil($numIdSistemaSip, $numIdPerfilSipBasico, 'infra_acesso_usuario_listar');
      ScriptSip::adicionarRecursoPerfil($numIdSistemaSip, $numIdPerfilSipCoordenadorPerfil, 'infra_acesso_usuario_listar');
      ScriptSip::adicionarRecursoPerfil($numIdSistemaSip, $numIdPerfilSipCoordenadorUnidade, 'infra_acesso_usuario_listar');

      ScriptSip::adicionarRecursoPerfil($numIdSistemaSip, $numIdPerfilSipBasico, 'infra_trocar_unidade');

      ScriptSip::removerRecurso($numIdSistemaSip,'contexto_cadastrar');
      ScriptSip::removerRecurso($numIdSistemaSip,'contexto_alterar');
      ScriptSip::removerRecurso($numIdSistemaSip,'contexto_consultar');
      ScriptSip::removerRecurso($numIdSistemaSip,'contexto_excluir');
      ScriptSip::removerRecurso($numIdSistemaSip,'contexto_listar');
      ScriptSip::removerRecurso($numIdSistemaSip,'contexto_desativar');
      ScriptSip::removerRecurso($numIdSistemaSip,'contexto_reativar');
      ScriptSip::removerRecurso($numIdSistemaSip,'contexto_selecionar');

      $objInfraMetaBD->excluirChaveEstrangeira('login','fk_login_contexto');
      $arrIndices = $objInfraMetaBD->obterIndices(null,'login');

      if (isset($arrIndices['login']['i03_login'])){
        $objInfraMetaBD->excluirIndice('login','i03_login');
      }

      if (isset($arrIndices['login']['fk_login_contexto'])){
        $objInfraMetaBD->excluirIndice('login','fk_login_contexto');
      }

      $objInfraMetaBD->excluirColuna('login','id_contexto');
      BancoSip::getInstance()->executarSql('drop table contexto');

      ScriptSip::removerRecurso($numIdSistemaSip,'grupo_rede_cadastrar');
      ScriptSip::removerRecurso($numIdSistemaSip,'grupo_rede_alterar');
      ScriptSip::removerRecurso($numIdSistemaSip,'grupo_rede_consultar');
      ScriptSip::removerRecurso($numIdSistemaSip,'grupo_rede_excluir');
      ScriptSip::removerRecurso($numIdSistemaSip,'grupo_rede_listar');
      ScriptSip::removerRecurso($numIdSistemaSip,'grupo_rede_desativar');
      ScriptSip::removerRecurso($numIdSistemaSip,'grupo_rede_reativar');
      ScriptSip::removerRecurso($numIdSistemaSip,'grupo_rede_selecionar');

      ScriptSip::removerRecurso($numIdSistemaSip,'rel_grupo_rede_unidade_cadastrar');
      ScriptSip::removerRecurso($numIdSistemaSip,'rel_grupo_rede_unidade_consultar');
      ScriptSip::removerRecurso($numIdSistemaSip,'rel_grupo_rede_unidade_excluir');
      ScriptSip::removerRecurso($numIdSistemaSip,'rel_grupo_rede_unidade_listar');

      $objInfraMetaBD->excluirChaveEstrangeira('login','fk_login_grupo_rede');

      if (BancoSip::getInstance() instanceof InfraSqlServer){
        $objInfraMetaBD->excluirIndice('login', 'fk_login_grupo_rede');
      }

      $objInfraMetaBD->excluirColuna('login','id_grupo_rede');

      BancoSip::getInstance()->executarSql('drop table rel_grupo_rede_unidade');
      BancoSip::getInstance()->executarSql('drop table grupo_rede');

      $objInfraMetaBD->adicionarColuna('usuario','cpf',$objInfraMetaBD->tipoNumeroGrande(),'null');
      $objInfraMetaBD->adicionarColuna('usuario','nome_registro_civil',$objInfraMetaBD->tipoTextoVariavel(100),'null');
      BancoSip::getInstance()->executarSql('update usuario set nome_registro_civil=nome');
      $objInfraMetaBD->alterarColuna('usuario','nome_registro_civil',$objInfraMetaBD->tipoTextoVariavel(100),'not null');
      $objInfraMetaBD->adicionarColuna('usuario','nome_social',$objInfraMetaBD->tipoTextoVariavel(100),'null');
      $objInfraMetaBD->adicionarColuna('usuario','email',$objInfraMetaBD->tipoTextoVariavel(100),'null');



      $objInfraMetaBD->criarIndice('usuario','i03_usuario',array('id_origem'));
      $objInfraMetaBD->criarIndice('usuario','i04_usuario',array('cpf'));
      $objInfraMetaBD->criarIndice('usuario','i05_usuario',array('id_usuario','id_orgao','id_origem'));
      $objInfraMetaBD->criarIndice('usuario','i06_usuario',array('id_usuario','id_orgao','cpf'));

      $objInfraMetaBD->excluirColuna('login', 'dn_usuario');

      $objRecursoDTO = ScriptSip::adicionarRecursoPerfil($numIdSistemaSip, $numIdPerfilSipBasico, 'login_listar');
      ScriptSip::adicionarItemMenu($numIdSistemaSip,$numIdPerfilSipAdministradorSip, $numIdMenuSip, null, $objRecursoDTO->getNumIdRecurso(),'Acessos', 140);
      ScriptSip::adicionarRecursoPerfil($numIdSistemaSip, $numIdPerfilSipBasico, 'login_consultar');

      $objInfraMetaBD->adicionarColuna('usuario','sin_bloqueado',$objInfraMetaBD->tipoTextoFixo(1),'null');
      BancoSip::getInstance()->executarSql('update usuario set sin_bloqueado=\'N\'');
      $objInfraMetaBD->alterarColuna('usuario','sin_bloqueado',$objInfraMetaBD->tipoTextoFixo(1),'not null');

      BancoSip::getInstance()->executarSql('insert into infra_parametro (nome,valor) values (\'SIP_MSG_USUARIO_BLOQUEADO\',\'Usu�rio bloqueado.\')');

      BancoSip::getInstance()->executarSql('insert into infra_parametro (nome,valor) values (\'SIP_2_FATORES_SUFIXOS_EMAIL_NAO_PERMTIDOS\',\'.jus.br, .gov.br\')');
      BancoSip::getInstance()->executarSql('insert into infra_parametro (nome,valor) values (\'SIP_2_FATORES_TEMPO_DIAS_VALIDADE_DISPOSITIVO\',\'45\')');
      BancoSip::getInstance()->executarSql('insert into infra_parametro (nome,valor) values (\'SIP_2_FATORES_TEMPO_DIAS_LINK_BLOQUEIO\',\'10\')');
      BancoSip::getInstance()->executarSql('insert into infra_parametro (nome,valor) values (\'SIP_2_FATORES_TEMPO_MINUTOS_LINK_HABILITACAO\',\'60\')');

      BancoSip::getInstance()->executarSql('
          CREATE TABLE codigo_acesso
          (
            id_codigo_acesso      '.$objInfraMetaBD->tipoTextoVariavel(26).'  NOT NULL ,
            id_usuario            '.$objInfraMetaBD->tipoNumero().'  NOT NULL ,
            id_usuario_desativacao '.$objInfraMetaBD->tipoNumero().' NULL ,
            id_sistema            '.$objInfraMetaBD->tipoNumero().'  NOT NULL ,
            chave_geracao         '.$objInfraMetaBD->tipoTextoVariavel(32).'  NOT NULL ,
            dth_geracao           '.$objInfraMetaBD->tipoDataHora().'  NOT NULL ,
            chave_ativacao        '.$objInfraMetaBD->tipoTextoVariavel(60).'  NULL ,
            dth_envio_ativacao    '.$objInfraMetaBD->tipoDataHora().'  NULL ,
            dth_ativacao          '.$objInfraMetaBD->tipoDataHora().'  NULL ,
            chave_desativacao     '.$objInfraMetaBD->tipoTextoVariavel(60).'  NULL ,
            dth_envio_desativacao '.$objInfraMetaBD->tipoDataHora().'  NULL ,
            dth_desativacao       '.$objInfraMetaBD->tipoDataHora().'  NULL ,
            dth_acesso            '.$objInfraMetaBD->tipoDataHora().'  NULL ,
            email                 '.$objInfraMetaBD->tipoTextoVariavel(100).'  NULL ,
            sin_ativo             '.$objInfraMetaBD->tipoTextoFixo(1).'  NOT NULL 
          )');

      $objInfraMetaBD->adicionarChavePrimaria('codigo_acesso','pk_codigo_acesso',array('id_codigo_acesso'));

      $objInfraMetaBD->adicionarChaveEstrangeira('fk_codigo_acesso_usuario','codigo_acesso',array('id_usuario'),'usuario',array('id_usuario'));
      $objInfraMetaBD->adicionarChaveEstrangeira('fk_cod_acesso_usu_desativacao','codigo_acesso',array('id_usuario_desativacao'),'usuario',array('id_usuario'));
      $objInfraMetaBD->adicionarChaveEstrangeira('fk_codigo_acesso_sistema','codigo_acesso',array('id_sistema'),'sistema',array('id_sistema'));

      $objInfraMetaBD->criarIndice('codigo_acesso','i01_codigo_acesso',array('dth_geracao'));
      $objInfraMetaBD->criarIndice('codigo_acesso','i01_codigo_acesso',array('dth_ativacao'));

      BancoSip::getInstance()->executarSql('
          CREATE TABLE usuario_historico
          (
            id_usuario_historico  '.$objInfraMetaBD->tipoNumero().'  NOT NULL ,
            id_codigo_acesso      '.$objInfraMetaBD->tipoTextoVariavel(26).'  NULL ,
            id_usuario            '.$objInfraMetaBD->tipoNumero().'  NOT NULL ,
            id_usuario_operacao   '.$objInfraMetaBD->tipoNumero().'  NOT NULL ,
            dth_operacao          '.$objInfraMetaBD->tipoDataHora().'  NOT NULL ,
            sta_operacao          '.$objInfraMetaBD->tipoTextoFixo(1).'  NOT NULL ,
            motivo                '.$objInfraMetaBD->tipoTextoVariavel(4000).'  NULL 
          )');

      $objInfraMetaBD->adicionarChavePrimaria('usuario_historico','pk_usuario_historico',array('id_usuario_historico'));
      BancoSip::getInstance()->criarSequencialNativa('seq_usuario_historico',1);

      $objInfraMetaBD->adicionarChaveEstrangeira('fk_usuario_historico_usuario','usuario_historico',array('id_usuario'),'usuario',array('id_usuario'));
      $objInfraMetaBD->adicionarChaveEstrangeira('fk_usuario_historico_usu_oper','usuario_historico',array('id_usuario_operacao'),'usuario',array('id_usuario'));
      $objInfraMetaBD->adicionarChaveEstrangeira('fk_usuario_historico_cod_acess','usuario_historico',array('id_codigo_acesso'),'codigo_acesso',array('id_codigo_acesso'));

      BancoSip::getInstance()->executarSql('CREATE TABLE codigo_bloqueio
        (
          id_codigo_bloqueio    '.$objInfraMetaBD->tipoTextoVariavel(26).'  NOT NULL ,
          id_codigo_acesso      '.$objInfraMetaBD->tipoTextoVariavel(26).'  NOT NULL ,
          chave_bloqueio        '.$objInfraMetaBD->tipoTextoVariavel(60).'  NOT NULL ,
          dth_envio             '.$objInfraMetaBD->tipoDataHora().'  NOT NULL ,
          dth_bloqueio          '.$objInfraMetaBD->tipoDataHora().'  NULL ,
          sin_ativo             '.$objInfraMetaBD->tipoTextoFixo(1).'  NOT NULL 
        )');

      $objInfraMetaBD->adicionarChavePrimaria('codigo_bloqueio','pk_codigo_bloqueio',array('id_codigo_bloqueio'));
      $objInfraMetaBD->adicionarChaveEstrangeira('fk_cod_bloqueio_cod_acesso','codigo_bloqueio',array('id_codigo_acesso'),'codigo_acesso',array('id_codigo_acesso'));

      $objInfraMetaBD->criarIndice('codigo_bloqueio','i01_codigo_bloqueio',array('dth_envio'));

      BancoSip::getInstance()->executarSql('CREATE TABLE dispositivo_acesso (
          id_dispositivo_acesso  '.$objInfraMetaBD->tipoTextoVariavel(26).'  NOT NULL ,
          id_codigo_acesso      '.$objInfraMetaBD->tipoTextoVariavel(26).'  NOT NULL ,
          chave_dispositivo     '.$objInfraMetaBD->tipoTextoVariavel(60).'  NOT NULL ,
          chave_acesso          '.$objInfraMetaBD->tipoTextoVariavel(60).'  NULL ,
          dth_liberacao         '.$objInfraMetaBD->tipoDataHora().'  NULL ,
          user_agent            '.$objInfraMetaBD->tipoTextoVariavel(500).'  NOT NULL ,
          dth_acesso            '.$objInfraMetaBD->tipoDataHora().'  NOT NULL ,
          ip_acesso            '.$objInfraMetaBD->tipoTextoVariavel(39).'  NOT NULL ,
          sin_ativo             '.$objInfraMetaBD->tipoTextoFixo(1).'  NOT NULL
      )');

      $objInfraMetaBD->adicionarChavePrimaria('dispositivo_acesso','pk_dispositivo_acesso',array('id_dispositivo_acesso'));
      $objInfraMetaBD->adicionarChaveEstrangeira('fk_disp_acesso_cod_acesso','dispositivo_acesso',array('id_codigo_acesso'),'codigo_acesso',array('id_codigo_acesso'));

      $objInfraMetaBD->criarIndice('dispositivo_acesso','i01_dispositivo_acesso',array('dth_acesso'));
      $objInfraMetaBD->criarIndice('dispositivo_acesso','i02_dispositivo_acesso',array('dth_liberacao'));

      BancoSip::getInstance()->executarSql('
          CREATE TABLE email_sistema
          (
            id_email_sistema      '.$objInfraMetaBD->tipoNumero().'  NOT NULL ,
            id_email_sistema_modulo      '.$objInfraMetaBD->tipoTextoVariavel(50).'  NULL ,
            de                    '.$objInfraMetaBD->tipoTextoVariavel(250).'  NOT NULL ,
            para                  '.$objInfraMetaBD->tipoTextoVariavel(250).'  NOT NULL ,
            assunto               '.$objInfraMetaBD->tipoTextoVariavel(250).'  NOT NULL ,
            conteudo              '.$objInfraMetaBD->tipoTextoGrande().'  NOT NULL ,
            descricao             '.$objInfraMetaBD->tipoTextoVariavel(250).'  NOT NULL ,
            sin_ativo             '.$objInfraMetaBD->tipoTextoFixo(1).'  NOT NULL
          )');

      $objInfraMetaBD->adicionarChavePrimaria('email_sistema','pk_email_sistema',array('id_email_sistema'));

      BancoSip::getInstance()->executarSql('
        INSERT INTO email_sistema (id_email_sistema,descricao,de,para,assunto,conteudo,sin_ativo,id_email_sistema_modulo)
        VALUES
        (1,\'Ativa��o da Autentica��o em 2 Fatores\',
           \'@sigla_sistema@/@sigla_orgao_sistema@ <@email_sistema@>\',
           \'@nome_usuario@ <@email_usuario@>\',\'Ativa��o da Autentica��o em 2 Fatores\',
           \'A autentica��o em 2 fatores foi solicitada para sua conta no sistema @sigla_sistema@/@sigla_orgao_sistema@ em @data@ �s @hora@.'.
          $objInfraMetaBD->novaLinha().
          $objInfraMetaBD->novaLinha().
          'Clique no link abaixo para ativ�-la:'.
          $objInfraMetaBD->novaLinha().
          $objInfraMetaBD->novaLinha().
          '@endereco_ativacao@\',
           \'S\',
            null)');

      BancoSip::getInstance()->executarSql('
        INSERT INTO email_sistema (id_email_sistema,descricao,de,para,assunto,conteudo,sin_ativo,id_email_sistema_modulo)
        VALUES
        (2,\'Desativa��o da Autentica��o em 2 Fatores\',
           \'@sigla_sistema@/@sigla_orgao_sistema@ <@email_sistema@>\',
           \'@nome_usuario@ <@email_usuario@>\',\'Desativa��o da Autentica��o em 2 Fatores\',
           \'A desativa��o da autentica��o em 2 fatores foi solicitada para sua conta no sistema @sigla_sistema@/@sigla_orgao_sistema@ em @data@ �s @hora@.'.
          $objInfraMetaBD->novaLinha().
          $objInfraMetaBD->novaLinha().
          'Clique no link abaixo para desativ�-la:'.
          $objInfraMetaBD->novaLinha().
          $objInfraMetaBD->novaLinha().
          '@endereco_desativacao@\',
           \'S\',
            null)');

      BancoSip::getInstance()->executarSql('
        INSERT INTO email_sistema (id_email_sistema,descricao,de,para,assunto,conteudo,sin_ativo,id_email_sistema_modulo) 
        VALUES 
        (3,\'Alerta de seguran�a sobre acesso em outro dispositivo\',
           \'@sigla_sistema@/@sigla_orgao_sistema@ <@email_sistema@>\',
           \'@email_usuario@\',\'Alerta de Seguran�a\',
           \'Sua conta no sistema @sigla_sistema@/@sigla_orgao_sistema@ foi acessada a partir de um novo dispositivo em @data@ �s @hora@.'.
          $objInfraMetaBD->novaLinha().
          $objInfraMetaBD->novaLinha().
          'Se voc� n�o reconhece esta atividade altere imediatamente a sua senha ou clique no link abaixo para bloquear sua conta no sistema:'.
          $objInfraMetaBD->novaLinha().
          $objInfraMetaBD->novaLinha().
          '@endereco_bloqueio@\',
           \'S\',
            null)');

      BancoSip::getInstance()->executarSql('
        INSERT INTO email_sistema (id_email_sistema,descricao,de,para,assunto,conteudo,sin_ativo,id_email_sistema_modulo) 
        VALUES 
        (4,\'Bloqueio do usu�rio por link em e-mail de alerta de seguran�a\',
           \'@sigla_sistema@/@sigla_orgao_sistema@ <@email_sistema@>\',
           \'@email_usuario@\',\'Aviso de Bloqueio\',
           \'Sua conta no sistema @sigla_sistema@/@sigla_orgao_sistema@ foi bloqueada em @data@ �s @hora@.\',
           \'S\',
           null)');

      $objInfraMetaBD->adicionarColuna('sistema','sta_2_fatores',$objInfraMetaBD->tipoTextoFixo(1),'null');
      BancoSip::getInstance()->executarSql('update sistema set sta_2_fatores=\'P\'');
      $objInfraMetaBD->alterarColuna('sistema','sta_2_fatores',$objInfraMetaBD->tipoTextoFixo(1),'not null');

      if (BancoSip::getInstance() instanceof InfraOracle) {
        BancoSip::getInstance()->executarSql('alter table sistema rename column logo to logo_old');
        $objInfraMetaBD->adicionarColuna('sistema', 'logo', $objInfraMetaBD->tipoTextoGrande(), 'null');
        BancoSip::getInstance()->executarSql('UPDATE sistema SET logo = logo_old');
        $objInfraMetaBD->excluirColuna('sistema','logo_old');
      }

      $objInfraMetaBD->adicionarColuna('login', 'id_dispositivo_acesso', $objInfraMetaBD->tipoTextoVariavel(26), 'null');
      $objInfraMetaBD->adicionarChaveEstrangeira('fk_login_dispositivo_acesso','login',array('id_dispositivo_acesso'),'dispositivo_acesso',array('id_dispositivo_acesso'));

      $objInfraMetaBD->adicionarColuna('login', 'id_codigo_acesso', $objInfraMetaBD->tipoTextoVariavel(26), 'null');
      $objInfraMetaBD->adicionarChaveEstrangeira('fk_login_codigo_acesso','login',array('id_codigo_acesso'),'codigo_acesso',array('id_codigo_acesso'));

      ScriptSip::adicionarRecursoPerfil($numIdSistemaSip, $numIdPerfilSipAdministradorSip, 'email_sistema_alterar');
      $objRecursoDTO = ScriptSip::adicionarRecursoPerfil($numIdSistemaSip, $numIdPerfilSipBasico, 'email_sistema_listar');
      ScriptSip::adicionarItemMenu($numIdSistemaSip,$numIdPerfilSipAdministradorSip, $numIdMenuSip, null, $objRecursoDTO->getNumIdRecurso(),'E-mails do Sistema', 130);

      ScriptSip::adicionarRecursoPerfil($numIdSistemaSip, $numIdPerfilSipBasico, 'email_sistema_consultar');
      ScriptSip::adicionarRecursoPerfil($numIdSistemaSip, $numIdPerfilSipAdministradorSip, 'email_sistema_desativar');
      ScriptSip::adicionarRecursoPerfil($numIdSistemaSip, $numIdPerfilSipAdministradorSip, 'email_sistema_reativar');
      ScriptSip::adicionarRecursoPerfil($numIdSistemaSip, $numIdPerfilSipAdministradorSip, 'ajuda_variaveis_email_sistema');

      $objRecursoDTO = ScriptSip::adicionarRecursoPerfil($numIdSistemaSip, $numIdPerfilSipBasico, 'codigo_acesso_listar');
      ScriptSip::adicionarItemMenu($numIdSistemaSip,$numIdPerfilSipAdministradorSip, $numIdMenuSip, null, $objRecursoDTO->getNumIdRecurso(),'Autentica��o em 2 Fatores', 160);
      ScriptSip::adicionarRecursoPerfil($numIdSistemaSip, $numIdPerfilSipBasico, 'codigo_acesso_consultar');
      ScriptSip::adicionarRecursoPerfil($numIdSistemaSip, $numIdPerfilSipAdministradorSip, 'codigo_acesso_excluir');
      ScriptSip::adicionarRecursoPerfil($numIdSistemaSip, $numIdPerfilSipAdministradorSip, 'codigo_acesso_desativar');
      ScriptSip::adicionarRecursoPerfil($numIdSistemaSip, $numIdPerfilSipAdministradorSip, 'codigo_acesso_reativar');

      ScriptSip::adicionarRecursoPerfil($numIdSistemaSip, $numIdPerfilSipBasico, 'dispositivo_acesso_listar');
      ScriptSip::adicionarRecursoPerfil($numIdSistemaSip, $numIdPerfilSipBasico, 'dispositivo_acesso_consultar');

      ScriptSip::adicionarRecursoPerfil($numIdSistemaSip, $numIdPerfilSipBasico, 'codigo_bloqueio_listar');
      ScriptSip::adicionarRecursoPerfil($numIdSistemaSip, $numIdPerfilSipBasico, 'codigo_bloqueio_consultar');

      ScriptSip::adicionarRecursoPerfil($numIdSistemaSip, $numIdPerfilSipBasico, 'usuario_historico_listar');
      ScriptSip::adicionarRecursoPerfil($numIdSistemaSip, $numIdPerfilSipBasico, 'usuario_historico_consultar');
      ScriptSip::adicionarRecursoPerfil($numIdSistemaSip, $numIdPerfilSipBasico, 'usuario_historico_cadastrar');

      ScriptSip::adicionarRecursoPerfil($numIdSistemaSip, $numIdPerfilSipAdministradorSip, 'usuario_bloquear');
      ScriptSip::adicionarRecursoPerfil($numIdSistemaSip, $numIdPerfilSipAdministradorSip, 'usuario_desbloquear');

      ScriptSip::adicionarAuditoria($numIdSistemaSip,'Geral',array(
          'codigo_acesso_excluir',
          'codigo_acesso_desativar',
          'codigo_acesso_reativar',
          'infra_auditoria_listar'));

      $objInfraMetaBD->adicionarColuna('sistema','esquema_login',$objInfraMetaBD->tipoTextoVariavel(50), 'null');
      BancoSip::getInstance()->executarSql('update sistema set esquema_login=\''.InfraPaginaEsquema3::$ESQUEMA_AZUL_CLARO.'\' where id_sistema='.$numIdSistemaSip);

      $objInfraMetaBD->adicionarColuna('sistema','servicos_liberados',$objInfraMetaBD->tipoTextoVariavel(200),'null');
      $objInfraMetaBD->adicionarColuna('sistema','chave_acesso',$objInfraMetaBD->tipoTextoVariavel(60),'null');
      $objInfraMetaBD->adicionarColuna('sistema','crc',$objInfraMetaBD->tipoTextoFixo(8),'null');
      ScriptSip::adicionarRecursoPerfil($numIdSistemaSip, $numIdPerfilSipAdministradorSip, 'sistema_gerar_chave_acesso');
      ScriptSip::adicionarRecursoPerfil($numIdSistemaSip, $numIdPerfilSipAdministradorSip, 'sistema_servico_selecionar');

      ScriptSip::adicionarRecursoPerfil($numIdSistemaSip, $numIdPerfilSipAdministradorSistema, 'sistema_gerar_chave_acesso');
      ScriptSip::adicionarRecursoPerfil($numIdSistemaSip, $numIdPerfilSipAdministradorSistema, 'sistema_servico_selecionar');


      BancoSip::getInstance()->executarSql('update item_menu set sequencia=0 where id_item_menu_pai is null and id_sistema = '.$numIdSistemaSip);
      BancoSip::getInstance()->executarSql('update item_menu set sequencia=999 where id_item_menu_pai is null and rotulo=\'Infra\' and id_sistema = '.$numIdSistemaSip);

      BancoSip::getInstance()->executarSql('update item_menu set icone=\'menu.svg\' where rotulo=\'Menus\' and id_item_menu_pai is null and id_sistema='.$numIdSistemaSip);
      BancoSip::getInstance()->executarSql('update item_menu set icone=\'orgao.svg\' where rotulo=\'�rg�os\' and id_item_menu_pai is null and id_sistema='.$numIdSistemaSip);
      BancoSip::getInstance()->executarSql('update item_menu set icone=\'perfil.svg\' where rotulo=\'Perfis\' and id_item_menu_pai is null and id_sistema='.$numIdSistemaSip);
      BancoSip::getInstance()->executarSql('update item_menu set icone=\'sistema.svg\' where rotulo=\'Sistemas\' and id_item_menu_pai is null and id_sistema='.$numIdSistemaSip);
      BancoSip::getInstance()->executarSql('update item_menu set icone=\'usuario.svg\' where rotulo=\'Usu�rios\' and id_item_menu_pai is null and id_sistema='.$numIdSistemaSip);
      BancoSip::getInstance()->executarSql('update item_menu set icone=\'unidade.svg\' where rotulo=\'Unidades\' and id_item_menu_pai is null and id_sistema='.$numIdSistemaSip);
      BancoSip::getInstance()->executarSql('update item_menu set icone=\'recurso.svg\' where rotulo=\'Recursos\' and id_item_menu_pai is null and id_sistema='.$numIdSistemaSip);
      BancoSip::getInstance()->executarSql('update item_menu set icone=\'permissao.svg\' where rotulo=\'Permiss�es\' and id_item_menu_pai is null and id_sistema='.$numIdSistemaSip);
      BancoSip::getInstance()->executarSql('update item_menu set icone=\'hierarquia.svg\' where rotulo=\'Hierarquias\' and id_item_menu_pai is null and id_sistema='.$numIdSistemaSip);
      BancoSip::getInstance()->executarSql('update item_menu set icone=\'regra_auditoria.svg\' where rotulo=\'Regras de Auditoria\' and id_item_menu_pai is null and id_sistema='.$numIdSistemaSip);
      BancoSip::getInstance()->executarSql('update item_menu set icone=\'servidor_autenticacao.svg\' where rotulo=\'Servidores de Autentica��o\' and id_item_menu_pai is null and id_sistema='.$numIdSistemaSip);
      BancoSip::getInstance()->executarSql('update item_menu set icone=\'2fa.svg\' where rotulo=\'Autentica��o em 2 Fatores\' and id_item_menu_pai is null and id_sistema='.$numIdSistemaSip);
      BancoSip::getInstance()->executarSql('update item_menu set icone=\'email.svg\' where rotulo=\'E-mails do Sistema\' and id_item_menu_pai is null and id_sistema='.$numIdSistemaSip);
      BancoSip::getInstance()->executarSql('update item_menu set icone=\'acesso.svg\' where rotulo=\'Acessos\' and id_item_menu_pai is null and id_sistema='.$numIdSistemaSip);
      BancoSip::getInstance()->executarSql('update item_menu set icone=\'infra.svg\' where rotulo=\'Infra\' and id_item_menu_pai is null and id_sistema='.$numIdSistemaSip);

      $objInfraMetaBD->processarIndicesChavesEstrangeiras();

      ScriptSip::adicionarAuditoria($numIdSistemaSip,'Geral',array(
          'sistema_gerar_chave_acesso'));

      $objInfraSequencia = new InfraSequencia(BancoSip::getInstance());
      BancoSip::getInstance()->executarSql('insert into infra_agendamento_tarefa (
                            id_infra_agendamento_tarefa, descricao, comando, sta_periodicidade_execucao,
                            periodicidade_complemento, dth_ultima_execucao, dth_ultima_conclusao,
                            sin_sucesso, parametro, email_erro, sin_ativo)
                            values ('.$objInfraSequencia->obterProximaSequencia('infra_agendamento_tarefa').',\'Replica regras de auditoria para o SEI.\',\'AgendamentoRN::replicarRegrasAuditoriaSEI\',\'D\',\'7\',null,null,\'N\',null,null,\'S\')');



      $objInfraMetaBD->alterarColuna('orgao', 'descricao', $objInfraMetaBD->tipoTextoVariavel(250), 'not null');

      InfraDebug::getInstance()->setBolDebugInfra(false);

      $this->fixIndices30($objInfraMetaBD);

      InfraDebug::getInstance()->gravar('********************************************************************************************');

      $objSistemaDTO = new SistemaDTO();
      $objSistemaDTO->setNumIdSistema($numIdSistemaSip);
      $objSistemaRN = new SistemaRN();
      $objSistemaDTO = $objSistemaRN->gerarChaveAcesso($objSistemaDTO);
      InfraDebug::getInstance()->gravar('CHAVE DE ACESSO SIP:'.$objSistemaDTO->getStrChaveCompleta());

      $objSistemaDTO = new SistemaDTO();
      $objSistemaDTO->setNumIdSistema($numIdSistemaSei);
      $objSistemaRN = new SistemaRN();
      $objSistemaDTO = $objSistemaRN->gerarChaveAcesso($objSistemaDTO);
      InfraDebug::getInstance()->gravar('CHAVE DE ACESSO SEI:'.$objSistemaDTO->getStrChaveCompleta());

      InfraDebug::getInstance()->gravar('********************************************************************************************');

    }catch(Exception $e){
      throw new InfraException('Erro atualizando vers�o.', $e);
    }
  }

  protected function fixIndices21(InfraMetaBD $objInfraMetaBD){

    InfraDebug::getInstance()->setBolDebugInfra(true);

    $this->logar('ATUALIZANDO INDICES...');

    $arrTabelas21 = array('administrador_sistema','contexto','coordenador_perfil','coordenador_unidade','dtproperties','grupo_rede',
        'hierarquia','item_menu','login','menu','orgao','perfil','permissao','recurso','recurso_vinculado','regra_auditoria',
        'rel_grupo_rede_unidade','rel_hierarquia_unidade','rel_orgao_autenticacao','rel_perfil_item_menu','rel_perfil_recurso',
        'rel_regra_auditoria_recurso','servidor_autenticacao','sistema','tipo_permissao','unidade','usuario');

    $objInfraMetaBD->processarIndicesChavesEstrangeiras($arrTabelas21);

    InfraDebug::getInstance()->setBolDebugInfra(false);
  }

  protected function fixIndices30(InfraMetaBD $objInfraMetaBD){

    InfraDebug::getInstance()->setBolDebugInfra(true);

    $this->logar('ATUALIZANDO INDICES...');

    $arrTabelas21 = array('administrador_sistema','coordenador_perfil','coordenador_unidade','dtproperties',
        'hierarquia','item_menu','login','menu','orgao','perfil','permissao','recurso','recurso_vinculado','regra_auditoria',
        'rel_hierarquia_unidade','rel_orgao_autenticacao','rel_perfil_item_menu','rel_perfil_recurso',
        'rel_regra_auditoria_recurso','servidor_autenticacao','sistema','tipo_permissao','unidade','usuario',
        'codigo_acesso', 'usuario_historico', 'codigo_bloqueio', 'dispositivo_acesso', 'email_sistema');

    $objInfraMetaBD->processarIndicesChavesEstrangeiras($arrTabelas21);

    InfraDebug::getInstance()->setBolDebugInfra(false);
  }

}
  try{

    session_start();

    SessaoSip::getInstance(false);

    BancoSip::getInstance()->setBolScript(true);

    $objInfraParametro = new InfraParametro(BancoSip::getInstance());
    if (!$objInfraParametro->isSetValor('SIP_VERSAO')){
      $objInfraParametro->setValor('SIP_VERSAO', '2.1.0');
    }else{
      $strVersaoBanco = $objInfraParametro->getValor('SIP_VERSAO');
      if (count(explode('.',$strVersaoBanco))==2){
        $strVersaoBanco .= '.0';
        $objInfraParametro->setValor('SIP_VERSAO',$strVersaoBanco);
      }
    }

    $objVersaoSipRN = new VersaoSipRN();
    $objVersaoSipRN->setStrNome('SIP');
    $objVersaoSipRN->setStrVersaoAtual(SIP_VERSAO);
    $objVersaoSipRN->setStrParametroVersao('SIP_VERSAO');
    $objVersaoSipRN->setArrVersoes(array('2.0.*' => 'versao_2_0_0',
                                         '2.1.*' => 'versao_2_1_0',
                                         '3.0.*' => 'versao_3_0_0'
    ));
    $objVersaoSipRN->setStrVersaoInfra('1.583.4');
    $objVersaoSipRN->setBolMySql(true);
    $objVersaoSipRN->setBolOracle(true);
    $objVersaoSipRN->setBolSqlServer(true);
    $objVersaoSipRN->setBolPostgreSql(true);
    $objVersaoSipRN->setBolErroVersaoInexistente(true);

    $objVersaoSipRN->atualizarVersao();

	}catch(Exception $e){
		echo(InfraException::inspecionar($e));
		try{LogSip::getInstance()->gravar(InfraException::inspecionar($e));	}catch (Exception $e){}
		exit(1);
	}
?>