<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products=Product::all();
        return response()->json(['status'=>200,'products'=>$products]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'sku' => 'required',
            'quantity' => 'required|gte:0',
            'price' => 'required|gte:0',
            'image' => 'mimes:jpeg,png,jpg,gif'          
           ]);

        $product=new Product();
        $product->name=$request->name;
        $product->sku=$request->sku;
        $product->qty=$request->quantity;
        $product->price=$request->price;
        if ($request->hasFile('image')) {
            $extension = $request->image->getClientOriginalExtension();
            $filename = rand(10000, 99999) . time() . '.' . $extension;
            $request->image->move('uploads/user/', $filename);
            $product->image = $filename;
        };

        $product->save();

        return response()->json(['message'=>'Product Added Successfully']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $product=Product::find($id);
        @unlink('uploads/user/' . $product->image);
        $product->delete();
        return response()->json(['message'=>'Product Successfully Deleted']);
    }
}
