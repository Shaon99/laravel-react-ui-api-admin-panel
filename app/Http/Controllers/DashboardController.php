<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function dashboard(){
        $contact=User::count();
        $product=Product::count();
        return response()->json(['contact'=>$contact,'product'=>$product]);
    }
}
