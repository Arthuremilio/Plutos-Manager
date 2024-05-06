import java.util.Date;

public class Usuario {
    private int idUsuario;
    private String nomeUsuario;
    private String documento;
    private String telefone;
    private String email;
    private String logradouro;
    private String cep;
    private String numero;
    private String cidade;
    private String estado;
    private String pais;
    private String usuario;
    private String senha;
    private Date vencimento;
 
    public Usuario() {
        idUsuario = 0;
        nomeUsuario =  new String();
        documento = new String();
        telefone = new String();
        email = new String();
        logradouro = new String();
        cep = new String();
        numero = new String();
        cidade = new String();
        estado = new String();
        pais = new String();
        usuario = new String();
        senha = new String();
        vencimento = new Date();        
    }
 
    public Usuario(int idUsuario, String nomeUsuario, String documento, String telefone, String email, String logradouro, String cep, String numero, String cidade, String estado, String pais, String usuario, String senha, Date vencimento) {
       this.idUsuario = idUsuario;
       this.nomeUsuario = nomeUsuario;
       this.documento = documento;
       this.telefone = telefone;
       this.email = email;
       this.logradouro = logradouro;
       this.cep = cep;
       this.numero = numero;
       this.cidade = cidade;
       this.estado = estado;
       this.pais = pais;
       this.usuario = usuario;
       this.senha = senha;
       this.vencimento = vencimento;
    }
 
    public int getId() {
       return this.idUsuario;
    }
 
    public void setId(int idUsuario) {
       this.idUsuario = idUsuario;
    }
 
    public String getNomeUsuario() {
       return this.nomeUsuario;
    }
 
    public void setNomeUsuario(String nomeUsuario) {
       this.nomeUsuario = nomeUsuario;
    }
 
    public String getDocumento() {
       return this.documento;
    }
 
    public void setDocumento(String documento) {
       this.documento = documento;
    }
 
    public String getTelefone() {
       return this.telefone;
    }
 
    public void setTelefone(String telefone) {
       this.telefone = telefone;
    }
 
    public String getEmail() {
       return this.email;
    }
 
    public void setEmail(String email) {
       this.email = email;
    }
 
    public String getLogradouro() {
       return this.logradouro;
    }
 
    public void setLogradouro(String logradouro) {
       this.logradouro = logradouro;
    }
 
    public String getCep() {
      return cep;
   }

   public void setCep(String cep) {
      this.cep = cep;
   }

   public String getNumero() {
       return this.numero;
    }
 
    public void setNumero(String numero) {
       this.numero = numero;
    }
 
    public String getCidade() {
       return this.cidade;
    }
 
    public void setCidade(String cidade) {
       this.cidade = cidade;
    }
 
    public String getEstado() {
       return this.estado;
    }
 
    public void setEstado(String estado) {
       this.estado = estado;
    }
 
    public String getPais() {
       return this.pais;
    }
 
    public void setPais(String pais) {
       this.pais = pais;
    }
 
    public String getUsuario() {
       return this.usuario;
    }
 
    public void setUsuario(String usuario) {
       this.usuario = usuario;
    }
 
    public String getSenha() {
       return this.senha;
    }
 
    public void setSenha(String senha) {
       this.senha = senha;
    }
 
    public Date getVencimento() {
       return this.vencimento;
    }
 
    public void setVencimento(Date vencimento) {
       this.vencimento = vencimento;
    }
}
