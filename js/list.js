$("document").ready(function(){
	
	const containerFavoriteList = document.getElementById("containerFavoriteList");
	const divContainer = document.createElement("div");
	const addToList = document.createElement("input");
	const delFromFavorite = document.createElement("input");
	const cancelChoise = document.createElement("input");
	
	addToList.value = "Dodaj do listy";
	delFromFavorite.value = "Usuń z ulubionych";
	cancelChoise.value = "Anuluj";

	addToList.type = "button";
	delFromFavorite.type = "button";
	cancelChoise.type = "button";
	
	addToList.setAttribute("class", "FavoriteButtons");
	delFromFavorite.setAttribute("class", "FavoriteButtons");
	cancelChoise.setAttribute("class", "FavoriteButtons");
	
	$("select").change(function(){
		
		let self = this.value;
			
		let product = this.value.match(/^\w*[a-zA-ZąćęłńóśźżĄĘŁŃÓŚŹŻ]*\w*\s*\D*/);
	             
        let quantity = this.value.match(/\s*[0-9-?]{1,}\s*\w*[a-zA-ZąćęłńóśźżĄĘŁŃÓŚŹŻ]*\w*/g);
       		
		divContainer.prepend(cancelChoise);
		divContainer.prepend(delFromFavorite);
		divContainer.prepend(addToList);
		
		containerFavoriteList.prepend(divContainer);
		
		$(containerFavoriteList).show(400);
		
		$(addToList).click(function(){
			
			$.post("../shopping/php/addToList.php", {"login": localStorage.getItem("login"), "productValue": product.toString(), "quantityValue": quantity.toString()});
        
			document.location.reload();
		});
		
		$(delFromFavorite).click(function(){
			
			$.post("../shopping/php/deleteFromFavorite.php", {"login": localStorage.getItem("login"), "productValue": product.toString()});
        
			document.location.reload();
		});
        
        $(cancelChoise).click(function(){
			
			$(containerFavoriteList).hide(400);
			
			setTimeout(function(){location.reload();},420);
		});                		
		
	});
		
/*-------------------------------------------------------------------------*/
	//GDY NIE MA LOGINU W LOCALSTORAGE POJAWIA SIE DIV DO JEGO WPISANIA
/*-------------------------------------------------------------------------*/
	let containerForUser = document.createElement("div");
	
	containerForUser.setAttribute("id", "containerForUser");
	
	const labelFromUser = document.createElement("div");
	
	labelFromUser.innerHTML = "Podaj nazwę użytkownika<br>"
	
	let user = document.createElement("input");
	
	user.type = "text";
	
	user.style.display = "block";
	
	user.setAttribute("id", "newUser");
	
	let acceptUser = document.createElement("input");
	
	acceptUser.type = "button";
	
	acceptUser.value = "Zapisz";
	
	acceptUser.setAttribute("id", "accpetUser");
		
	if(localStorage.getItem("login") == undefined)
	{
		document.body.prepend(containerForUser);
		
		containerForUser.prepend(acceptUser);
		
		containerForUser.prepend(user);
		
		containerForUser.prepend(labelFromUser);
		
		$(acceptUser).click(function(){
			
			if($(user).val() != "")
			{
				localStorage.setItem("login", $(user).val());
				
				$(user).css({"border": "1px solid silver"});
				
				document.location.reload();
			}
			
			else
			{
				$(user).css({"border": "1px solid red"});
			}
			
		});
	
	}
	
/*-------------------------------------------------------------------------*/
	/*POBIERA LOGIN Z BAZY I W ZALEZNOSCI JESLI LOGIN JEST W BAZIE TO
	WYSWIETLA LISTE, JESLI NIE MA TO DODAJE LOGIN DO BAZY*/
/*-------------------------------------------------------------------------*/
	$.post("../shopping/php/login.php", {"login": localStorage.getItem("login")}, function(data){
		
		let login = $("login", data);
		
		try
		{
			if(localStorage.getItem("login") == login[0].innerHTML)
			{
				$.post("../shopping/php/getDataFromList.php", {"login": localStorage.getItem("login")}, function(data){

					let product = $("product", data);
					let quantity = $("quantity", data);
					let table = document.getElementById("list");

					for(let i = 0; i < product.length; i++)
					{
						let trElement = document.createElement("tr");
						let productTD = document.createElement("td");
						let quantityTD = document.createElement("td");
						productTD.appendChild(product[i]);
						quantityTD.appendChild(quantity[i]);
						trElement.appendChild(productTD);
						trElement.appendChild(quantityTD);

						table.appendChild(trElement);
						
						$(trElement).click(function(){
							$(this).fadeOut(400);
						});
					}
				});
				
				$.post("../shopping/php/getDataFromFavorite.php", {"login": localStorage.getItem("login")},function(data){
        
					let product = $("product", data);
					let quantity = $("quantity", data);
					let select = document.getElementById("favorite");


					for(let i = 0; i < product.length; i++)
					{
						let option = document.createElement("option");
						option.innerHTML = " "+quantity[i].innerHTML; 
						option.prepend(product[i]);    
						select.appendChild(option);
					}
				})
			}
		}
		catch(err)
		{
			if(localStorage.getItem("login") != undefined)
			{
				$.post("../shopping/php/addUser.php", {"user": localStorage.getItem("login")});
			}
		}
	})
	
	$("#login").html(localStorage.getItem("login")).css({color: "darkorange", "font-family": "Arial"});

/*--------------------------------------------------------------
	WYSUWA MENU PO KLIKNIECIU W HAMBURGER
--------------------------------------------------------------*/
	let flag = 0;
	
	$("#hamburger").click(function(){
		
		if(flag == 0)
		{
			$("nav").show(400);
						
			flag = 1;
			
			$(this).css({"animation": "rotateStart 0.4s both"});
		}
		
		else
		{
			$("nav").hide(400);
			
			$("#container").hide(400);
     		
			$("#deleteListContainer").hide(300);
			
			flag = 0;
			
			$(this).css({"animation": "rotateEnd 0.4s both"});
		}
	});
	
/*-------------------------------------------------------------------------*/
	//TWORZY FORMULARZ DO WPISYWANIA PRODUKTÓW
/*-------------------------------------------------------------------------*/
		const mainElement = document.getElementById("container");
		const containerAddToList = document.createElement("div");
		const produktLabel = document.createElement("label");
		const produkt = document.createElement("input");
		const pricetLabel = document.createElement("label");
		const price = document.createElement("input");
		const accept = document.createElement("input");
		const cancel = document.createElement("input");
	
		produktLabel.innerHTML = "Nazwa produktu"+"<br>";
		produkt.type = "text";
		pricetLabel.innerHTML = "Ilość" + "<br>";
		price.type = "text";
		accept.type = "button";
		accept.value = "Zapisz";
		cancel.type = "button";
		cancel.value = "Anuluj";
		produkt.style.display = "block";
		price.style.display = "block";
	
		mainElement.appendChild(produktLabel);
		mainElement.appendChild(produkt);
		mainElement.appendChild(pricetLabel);
		mainElement.appendChild(price);
		mainElement.appendChild(accept);
		mainElement.appendChild(cancel);
		
	function createElemet(productId, priceID, acceptID, cancelID, destinationFile)
	{
		produkt.setAttribute("id", productId);
		price.setAttribute("id", priceID);
		accept.setAttribute("id", acceptID);
		cancel.setAttribute("id", cancelID);

		$(accept).click(function(e){
            
            if($("#"+productId).val() == "" && $("#"+priceID).val() == "")
			{
				e.preventDefault();
				
				$("#"+productId).css({"border": "1px solid red"});
				
				$("#"+priceID).css({"border": "1px solid red"})
				
			}
			
			if($("#"+productId).val() != "" && $("#"+priceID).val() != "")
			{
				$.post(destinationFile, {"login": localStorage.getItem("login"),"productValue": $("#"+productId).val(), "quantityValue": $("#"+priceID).val()});
				
				document.location.reload(e);

			}
			
        });
        
        $(cancel).click(function(e){
			
			e.preventDefault();
            
            $("#container").hide(400);
					
			$("#"+productId).css({"border": "1px solid silver"});

			$("#"+priceID).css({"border": "1px solid silver"});
			
			setTimeout(function(){location.reload();},420);
        });
				
		$(mainElement).show(400);
		$("nav").hide(400);
	}
	
	$("ul li:first-child").click(function(){
		
		createElemet("addToListProdukt", "productListPrices", "acceptProductList", "cancelProductList", "../shopping/php/addToList.php");
					
	});
	
	$("ul li:nth-child(2)").click(function(){
		
		createElemet("addToFavoriteProduct", "productFavoritePrices", "acceptProductFavorite", "cancelProductFavorite", "../shopping/php/addToFavorite.php");

	});
    
    let deleteListContainer = document.getElementById("deleteListContainer");
    let deleteListLabel = document.createElement("label");
	let yes = document.createElement("input");
	let no = document.createElement("input");
	deleteListLabel.innerHTML = "Czy napewno chcesz usunąć listę?<br>";
	yes.type = "button";
	yes.value = "Tak";
	no.type = "button";
	no.value = "Nie";
	
	deleteListContainer.prepend(no);
	deleteListContainer.prepend(yes);
	deleteListContainer.prepend(deleteListLabel);

	$("ul li:nth-child(3)").click(function(){
		
		$(deleteListContainer).fadeIn(400);
    	
		$("nav").hide(400);
		
		$(yes).click(function(){
			
			$.post("../shopping/php/deleteFromList.php", {"login": localStorage.getItem("login")});
			
			$(deleteListContainer).fadeOut(400);
			
			setTimeout(function(){location.reload();},420);
		});
		
		$(no).click(function(){
			
			$(deleteListContainer).fadeOut(400);
			
			setTimeout(function(){location.reload();},420);
		});
	});
});